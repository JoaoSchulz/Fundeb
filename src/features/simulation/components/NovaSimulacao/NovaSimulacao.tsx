import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  SimulationHeader,
  SimulationFormFields,
  TabSelector,
  EnrollmentForm,
  RevenueForm,
  FormActions,
} from "./components";
import { useEnrollmentForm, useRevenueForm } from "./hooks";
import { parseBrazilianNumber, parseBrazilianInteger } from "../../../../utils/formatters";
import { SimulationService } from "../../services/simulationService";
import { LocalidadesService } from "../../../localidades/services/localidadesService";
import { VALOR_ALUNO_ANO, CATEGORIAS_AGREGADAS, CATEGORIAS_AGREGADAS_ARRAY } from "../../../../utils/constants/fundeb";
import { useAuth } from "../../../auth/hooks";
import type { TabType } from "./types/simulationForm";
import type { EnrollmentCategory } from "./types/simulationForm";

// Constantes FUNDEB para cálculos oficiais - Lei nº 14.113/2020, Anexo I
const VAAF_MINIMO_2024 = 5447.98; // Valor mínimo nacional por aluno/ano
const PONDERACOES = {
  // Educação Infantil - Lei 14.113/2020
  CRECHE: 1.0,
  PRE_ESCOLA: 1.0,
  // Ensino Fundamental - Lei 14.113/2020
  ANOS_INICIAIS: 1.0,      // Urbano
  ANOS_INICIAIS_RURAL: 1.15,
  ANOS_FINAIS: 1.15,        // Urbano (CORRIGIDO de 1.1 para 1.15)
  ANOS_FINAIS_RURAL: 1.20,
  // Ensino Médio - Lei 14.113/2020
  ENSINO_MEDIO: 1.25,       // Urbano/Regular
  ENSINO_MEDIO_RURAL: 1.30,
  ENSINO_MEDIO_INTEGRAL: 1.30,
  // Outras modalidades - Lei 14.113/2020
  EJA: 0.80,                // CORRIGIDO de 0.9 para 0.80
  EDUCACAO_ESPECIAL: 1.20,
  INDIGENA_QUILOMBOLA: 1.20,
};

export const NovaSimulacao = (): JSX.Element => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("enrollment");
  const [simulationName, setSimulationName] = useState("");
  const [baseYear, setBaseYear] = useState("");
  const [uf, setUf] = useState("");
  const [municipioId, setMunicipioId] = useState("");
  const [ufs, setUfs] = useState<string[]>([]);
  const [municipios, setMunicipios] = useState<Array<{ id: string; municipio: string; uf: string }>>([]);
  const [isLoadingMunicipios, setIsLoadingMunicipios] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingCategorias, setIsLoadingCategorias] = useState(false);
  const [selectedMunicipioData, setSelectedMunicipioData] = useState<{ municipio: string; uf: string } | null>(null);
  const [anosDisponiveis, setAnosDisponiveis] = useState<number[]>([]);
  const [isLoadingAnos, setIsLoadingAnos] = useState(true);
  
  // Verificar se usuário pode editar localização
  const isAdmin = user?.role === 'admin';
  const canEditLocation = isAdmin;
  
  // Ref para controlar se é primeira carga do município
  const isFirstLoadRef = useRef(true);
  const lastMunicipioIdRef = useRef<string>("");
  const lastBaseYearRef = useRef<string>("");
  const isMountedRef = useRef(false); // Para evitar cálculos na montagem inicial
  
  // Estados para cálculos FUNDEB oficiais (seguindo simuladorfundeb)
  const [calculosFundeb, setCalculosFundeb] = useState<{
    matriculasPonderadas: number;
    // VAAF - Valor Aluno Ano Fundeb
    vaafCalculado: number;
    complementacaoVAAF: number;
    // VAAT - Valor Aluno Ano Total
    vaatCalculado: number;
    complementacaoVAAT: number;
    // VAAR - Valor Aluno Ano de Resultado
    vaarCalculado: number;
    complementacaoVAAR: number;
    // Repasse Total
    repasseTotal: number;
  } | null>(null);
  
  // Estado para armazenar dados originais (baseline) do município
  const [dadosOriginais, setDadosOriginais] = useState<{
    totalMatriculas: number;
    matriculasPonderadas: number;
    repasseTotal: number;
  } | null>(null);
  
  // Estado para variações percentuais
  const [variacoes, setVariacoes] = useState<{
    matriculas: number;
    ponderadas: number;
    financeira: number;
  } | null>(null);
  
  // Estado para dados reais do município (do banco)
  const [dadosReaisMunicipio, setDadosReaisMunicipio] = useState<{
    receitaContribuicao: number;
    complementacaoVAAF: number;
    complementacaoVAAT: number;
    complementacaoVAAR: number;
    totalReceitasPrevistas: number;
  } | null>(null);

  const { categories, setCategories } = useEnrollmentForm();
  const { items, handleChange: handleRevenueChange, initializeItems } = useRevenueForm();
  
  // Função para calcular matrículas ponderadas
  const calcularMatriculasPonderadas = (cats: EnrollmentCategory[]): number => {
    console.log('🔢 [calcularMatriculasPonderadas] Iniciando cálculo...');
    console.log('📋 [calcularMatriculasPonderadas] Categorias recebidas:', cats);
    
    let total = 0;
    
    cats.forEach((cat) => {
      const matriculas = parseBrazilianInteger(cat.enrollments) || 0;
      
      // Buscar fator da categoria pelo ID
      const categoryConfig = CATEGORIAS_AGREGADAS[cat.id as keyof typeof CATEGORIAS_AGREGADAS];
      const factor = categoryConfig?.factor || 1.0;
      
      const ponderada = matriculas * factor;
      console.log(`   - ${cat.name}: ${matriculas} × ${factor} = ${ponderada}`);
      total += ponderada;
    });
    
    console.log(`✨ [calcularMatriculasPonderadas] Total ponderado: ${total}`);
    return total;
  };
  
  // Função para calcular VAAF, VAAT, VAAR e repasse total
  // Implementação baseada no simuladorfundeb oficial (fundeb-official-rules.js)
  const calcularFundeb = (cats: EnrollmentCategory[], isBaseline: boolean = false) => {
    console.log('💰 [calcularFundeb] Iniciando cálculo FUNDEB OFICIAL...');
    console.log(`   Modo: ${isBaseline ? 'BASELINE (Dados Originais)' : 'SIMULAÇÃO'}`);
    
    setIsCalculating(true);
    
    const matriculasPonderadas = calcularMatriculasPonderadas(cats);
    
    if (matriculasPonderadas === 0) {
      console.log('⚠️ [calcularFundeb] Matrículas ponderadas = 0, limpando cálculos');
      setCalculosFundeb(null);
      if (isBaseline) {
        setDadosOriginais(null);
        setVariacoes(null);
      }
      setIsCalculating(false);
      return;
    }
    
    // Calcular total de matrículas (não ponderadas - usado no VAAR)
    const totalMatriculas = cats.reduce((sum, cat) => sum + (parseBrazilianInteger(cat.enrollments) || 0), 0);
    
    // Se não temos dados reais do município, usar cálculo simplificado
    if (!dadosReaisMunicipio) {
      console.log('⚠️ [calcularFundeb] Sem dados reais, usando VAAF mínimo');
      const vaafCalculado = VAAF_MINIMO_2024;
      const repasseTotal = matriculasPonderadas * vaafCalculado;
      
      const resultado = {
        matriculasPonderadas,
        vaafCalculado,
        complementacaoVAAF: 0,
        vaatCalculado: 0,
        complementacaoVAAT: 0,
        vaarCalculado: 0,
        complementacaoVAAR: 0,
        repasseTotal,
      };
      
      setCalculosFundeb(resultado);
      if (isBaseline) {
        setDadosOriginais({
          totalMatriculas,
          matriculasPonderadas,
          repasseTotal,
        });
      }
      setIsCalculating(false);
      return;
    }
    
    console.log('📊 [calcularFundeb] Usando CÁLCULOS OFICIAIS (baseado em simuladorfundeb)');
    
    // 1. CALCULAR VAAF (Valor Aluno Ano Fundeb)
    // VAAF = Receita Contribuição / Matrículas Ponderadas
    const vaafReal = dadosReaisMunicipio.receitaContribuicao / matriculasPonderadas;
    console.log(`   VAAF Real calculado: R$ ${vaafReal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`);
    console.log(`   VAAF Mínimo: R$ ${VAAF_MINIMO_2024.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`);
    
    // Verificar se precisa complementação VAAF
    const needsVAAF = vaafReal < VAAF_MINIMO_2024;
    let complementacaoVAAF: number;
    
    if (needsVAAF) {
      // Complementação = (VAAF-MIN - VAAF_atual) × Matrículas_Ponderadas
      complementacaoVAAF = (VAAF_MINIMO_2024 - vaafReal) * matriculasPonderadas;
      console.log(`   ⚠️ Precisa complementação VAAF: R$ ${complementacaoVAAF.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`);
    } else if (!isBaseline) {
      // Se não é baseline e está acima do mínimo, escala proporcionalmente
      complementacaoVAAF = dadosReaisMunicipio.complementacaoVAAF * (matriculasPonderadas / (dadosReaisMunicipio.receitaContribuicao / vaafReal));
      console.log(`   ✅ Acima do mínimo, complementação proporcional: R$ ${complementacaoVAAF.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`);
    } else {
      // Baseline usa valor real do banco
      complementacaoVAAF = dadosReaisMunicipio.complementacaoVAAF;
      console.log(`   📌 Baseline: usando complementação real do banco: R$ ${complementacaoVAAF.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`);
    }
    
    // VAAF final = maior entre VAAF real e VAAF mínimo
    const vaafCalculado = Math.max(vaafReal, VAAF_MINIMO_2024);
    
    // 2. CALCULAR VAAT (Valor Aluno Ano Total)
    // VAAT = Receita Total Educação / Matrículas Ponderadas
    // Receita Total ≈ receitaContribuicao × 5 + complementacaoVAAF + (receitaContribuicao × 0.1)
    // Baseado no simuladorfundeb (fundeb-official-rules.js, linhas 93-96)
    const receitaTotalEducacao = 
      dadosReaisMunicipio.receitaContribuicao * 5 + // 100% dos impostos (FUNDEB = 20%, então × 5)
      complementacaoVAAF + // Complementação VAAF calculada
      (dadosReaisMunicipio.receitaContribuicao * 0.1); // +10% estimado (Salário-Educação, etc.)
    
    const vaatCalculado = receitaTotalEducacao / matriculasPonderadas;
    console.log(`   VAAT calculado: R$ ${vaatCalculado.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`);
    console.log(`   VAAT Mínimo: R$ 6500.00`);
    
    // Verificar se precisa complementação VAAT
    const needsVAAT = vaatCalculado < 6500.00;
    let complementacaoVAAT: number;
    
    if (needsVAAT) {
      complementacaoVAAT = (6500.00 - vaatCalculado) * matriculasPonderadas;
      console.log(`   ⚠️ Precisa complementação VAAT: R$ ${complementacaoVAAT.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`);
    } else if (!isBaseline && dadosReaisMunicipio.complementacaoVAAT > 0) {
      // Se já está acima mas recebe VAAT nos dados reais, mantém proporcional
      // Implementação do simuladorfundeb (fundeb-official-rules.js, linha 119)
      const matriculasPonderadasReais = dadosReaisMunicipio.receitaContribuicao / vaafReal;
      complementacaoVAAT = dadosReaisMunicipio.complementacaoVAAT * (matriculasPonderadas / matriculasPonderadasReais);
      console.log(`   ✅ Mantém VAAT proporcional: R$ ${complementacaoVAAT.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`);
    } else {
      complementacaoVAAT = isBaseline ? dadosReaisMunicipio.complementacaoVAAT : 0;
      console.log(`   📌 Complementação VAAT: R$ ${complementacaoVAAT.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`);
    }
    
    // 3. CALCULAR VAAR (Valor Aluno Ano de Resultado)
    // VAAR usa matrícula TOTAL (não ponderada) e escala proporcionalmente
    // Implementação do simuladorfundeb (fundeb-official-rules.js, linhas 164-166)
    let complementacaoVAAR: number;
    let vaarCalculado: number;
    
    if (dadosReaisMunicipio.complementacaoVAAR > 0 && totalMatriculas > 0) {
      // Município recebe VAAR, escalar proporcionalmente
      if (!isBaseline) {
        // Para simulação, precisamos das matrículas reais (baseline)
        const matriculasReais = dadosOriginais?.totalMatriculas || totalMatriculas;
        complementacaoVAAR = dadosReaisMunicipio.complementacaoVAAR * (totalMatriculas / matriculasReais);
      } else {
        complementacaoVAAR = dadosReaisMunicipio.complementacaoVAAR;
      }
      vaarCalculado = complementacaoVAAR / totalMatriculas;
      console.log(`   VAAR: R$ ${vaarCalculado.toLocaleString('pt-BR', {minimumFractionDigits: 2})} por aluno`);
      console.log(`   Complementação VAAR: R$ ${complementacaoVAAR.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`);
    } else {
      complementacaoVAAR = 0;
      vaarCalculado = 0;
      console.log(`   Município não recebe VAAR`);
    }
    
    // 4. CALCULAR REPASSE TOTAL
    // Repasse Total = Receita Base + Complementação VAAF + VAAT + VAAR
    const repasseTotal = 
      dadosReaisMunicipio.receitaContribuicao + 
      complementacaoVAAF + 
      complementacaoVAAT + 
      complementacaoVAAR;
    
    console.log(`💵 [calcularFundeb] COMPOSIÇÃO DO REPASSE:`);
    console.log(`   Receita Base: R$ ${dadosReaisMunicipio.receitaContribuicao.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`);
    console.log(`   + VAAF: R$ ${complementacaoVAAF.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`);
    console.log(`   + VAAT: R$ ${complementacaoVAAT.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`);
    console.log(`   + VAAR: R$ ${complementacaoVAAR.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`);
    console.log(`   = Total: R$ ${repasseTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`);
    
    const resultado = {
      matriculasPonderadas,
      vaafCalculado,
      complementacaoVAAF,
      vaatCalculado,
      complementacaoVAAT,
      vaarCalculado,
      complementacaoVAAR,
      repasseTotal,
    };
    
    // Se for baseline, salvar como dados originais
    if (isBaseline) {
      console.log('📌 [calcularFundeb] Salvando como BASELINE');
      setDadosOriginais({
        totalMatriculas,
        matriculasPonderadas,
        repasseTotal,
      });
      setVariacoes(null); // Sem variações no baseline
    } else if (dadosOriginais) {
      // Calcular variações percentuais
      const variacaoMatriculas = ((totalMatriculas - dadosOriginais.totalMatriculas) / dadosOriginais.totalMatriculas) * 100;
      const variacaoPonderadas = ((matriculasPonderadas - dadosOriginais.matriculasPonderadas) / dadosOriginais.matriculasPonderadas) * 100;
      const variacaoFinanceira = ((repasseTotal - dadosOriginais.repasseTotal) / dadosOriginais.repasseTotal) * 100;
      
      console.log('📊 [calcularFundeb] VARIAÇÕES CALCULADAS:');
      console.log(`   Matrículas: ${variacaoMatriculas.toFixed(2)}%`);
      console.log(`   Ponderadas: ${variacaoPonderadas.toFixed(2)}%`);
      console.log(`   Financeira: ${variacaoFinanceira.toFixed(2)}%`);
      
      setVariacoes({
        matriculas: variacaoMatriculas,
        ponderadas: variacaoPonderadas,
        financeira: variacaoFinanceira,
      });
    }
    
    console.log('✅ [calcularFundeb] Resultado final:', resultado);
    setCalculosFundeb(resultado);
    setIsCalculating(false);
  };

  const handleEnrollmentChange = (id: string, value: string): void => {
    console.log('🎯 [handleEnrollmentChange] Matrícula alterada!');
    console.log(`   ID: ${id}`);
    console.log(`   Novo valor: ${value}`);
    
    const newCategories = categories.map((cat) => {
      if (cat.id !== id) {
        return cat;
      }
      
      console.log(`   📝 Categoria sendo atualizada: ${cat.name}`);
      
      // Buscar fator da categoria pelo ID (educacaoInfantil, anosIniciaisFund, etc.)
      const categoryConfig = CATEGORIAS_AGREGADAS[id as keyof typeof CATEGORIAS_AGREGADAS];
      const factor = categoryConfig?.factor || 1.0;
      const matriculas = Number(value.replace(/\D/g, "")) || 0;
      const repasseSimulado = matriculas * VALOR_ALUNO_ANO * factor;
      
      console.log(`   💵 Repasse simulado calculado: ${matriculas} × ${VALOR_ALUNO_ANO} × ${factor} = R$ ${repasseSimulado.toLocaleString('pt-BR')}`);
      console.log(`   💵 Repasse original mantido: ${cat.originalTransfer}`);
      
      return {
        ...cat,
        enrollments: value,
        // IMPORTANTE: originalTransfer NÃO muda, só simulatedTransfer
        simulatedTransfer: new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(repasseSimulado),
      };
    });
    
    console.log('📦 [handleEnrollmentChange] Atualizando estado com novas categorias...');
    setCategories(newCategories);
    
    console.log('🔄 [handleEnrollmentChange] Chamando calcularFundeb em modo SIMULAÇÃO...');
    calcularFundeb(newCategories, false);
    console.log('✅ [handleEnrollmentChange] Processo concluído!\n');
  };
  
  // Recalcular FUNDEB quando as categorias, dados reais ou ano mudarem
  useEffect(() => {
    // Marcar como montado após primeira renderização
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      console.log('🎬 [useEffect categories] Componente montado, ignorando primeira execução');
      return;
    }
    
    console.log('🔄 [useEffect categories] Disparado');
    console.log(`   Quantidade de categorias: ${categories.length}`);
    console.log(`   municipioId: ${municipioId || 'não selecionado'}`);
    console.log(`   baseYear: ${baseYear || 'não selecionado'}`);
    console.log(`   dadosReaisMunicipio: ${dadosReaisMunicipio ? 'presente' : 'ausente'}`);
    console.log(`   isFirstLoadRef: ${isFirstLoadRef.current}`);
    
    // Não calcular se não há município selecionado
    if (!municipioId) {
      console.log('⚠️ [useEffect categories] Sem município selecionado, ignorando');
      return;
    }
    
    // Não calcular se não há dados reais (ainda carregando)
    if (!dadosReaisMunicipio) {
      console.log('⚠️ [useEffect categories] Aguardando dados reais do município...');
      return;
    }
    
    if (categories.length === 0) {
      console.log('⚠️ [useEffect categories] Sem categorias, limpando cálculos');
      setCalculosFundeb(null);
      setDadosOriginais(null);
      setVariacoes(null);
      return;
    }
    
    // Se é primeira carga do município OU ano mudou, salvar como baseline
    if (isFirstLoadRef.current) {
      console.log('📊 [useEffect categories] PRIMEIRA CARGA - Salvando baseline');
      isFirstLoadRef.current = false;
      calcularFundeb(categories, true);
    } else {
      console.log('🔄 [useEffect categories] Recalculando (modo simulação)');
      calcularFundeb(categories, false);
    }
  }, [categories.length, municipioId, baseYear, dadosReaisMunicipio]); // Monitorar baseYear e dadosReaisMunicipio também

  // Carregar UFs
  useEffect(() => {
    SimulationService.getUFs()
      .then((data) => setUfs(data))
      .catch((e) => {
        console.error("Error loading UFs", e);
        toast.error("Erro ao carregar UFs");
      });
  }, []);

  // Carregar anos disponíveis
  useEffect(() => {
    setIsLoadingAnos(true);
    LocalidadesService.getAnosDisponiveis()
      .then((anos) => {
        setAnosDisponiveis(anos);
        // Definir o primeiro ano (mais recente) como padrão se ainda não tiver selecionado
        if (!baseYear && anos.length > 0) {
          setBaseYear(String(anos[0]));
        }
      })
      .catch((e) => {
        console.error("Error loading anos disponíveis", e);
        toast.error("Erro ao carregar anos disponíveis");
        // Fallback para anos padrão
        setAnosDisponiveis([2025, 2024]);
        if (!baseYear) {
          setBaseYear("2025");
        }
      })
      .finally(() => setIsLoadingAnos(false));
  }, []);

  // Auto-selecionar UF e município para usuários não-admin
  useEffect(() => {
    if (!canEditLocation && user?.uf && user?.municipio) {
      console.log('👤 [useEffect user] Usuário não-admin, setando UF e município do perfil');
      console.log('   UF:', user.uf);
      console.log('   Município:', user.municipio);
      
      setUf(user.uf);
      
      // Carregar municípios da UF do usuário do ano selecionado (ou mais recente se não tiver ano)
      const anoSelecionado = baseYear ? parseInt(baseYear, 10) : undefined;
      SimulationService.getMunicipiosByUF(user.uf, anoSelecionado)
        .then((data) => {
          const municipiosData = data.map((m: any) => ({ 
            id: String(m.id), 
            municipio: m.municipio, 
            uf: m.uf 
          }));
          setMunicipios(municipiosData);
          
          // Encontrar e selecionar o município do usuário
          const userMunicipio = municipiosData.find(
            (m) => m.municipio.toLowerCase() === user.municipio?.toLowerCase()
          );
          
          if (userMunicipio) {
            console.log('   ✅ Município encontrado:', userMunicipio.municipio);
            setMunicipioId(userMunicipio.id);
          } else {
            console.log('   ⚠️ Município não encontrado na lista');
            toast.warning(`Município "${user.municipio}" não encontrado. Atualize seu perfil.`);
          }
        })
        .catch((e) => {
          console.error("Error loading municipios", e);
          toast.error("Erro ao carregar municípios");
        });
    }
  }, [user, canEditLocation, baseYear]);

  // Carregar municípios quando UF ou ano mudar (apenas para admin)
  useEffect(() => {
    if (!canEditLocation) return; // Usuário comum já tem município setado
    
    if (!uf) {
      setMunicipios([]);
      setMunicipioId("");
      setCategories([]);
      setCalculosFundeb(null);
      setDadosOriginais(null);
      setVariacoes(null);
      setDadosReaisMunicipio(null);
      return;
    }
    setIsLoadingMunicipios(true);
    const anoSelecionado = baseYear ? parseInt(baseYear, 10) : undefined;
    SimulationService.getMunicipiosByUF(uf, anoSelecionado)
      .then((data) => {
        // O backend já filtra por ano se fornecido, então apenas mapear os dados
        setMunicipios(data.map((m: any) => ({ id: String(m.id), municipio: m.municipio, uf: m.uf })));
      })
      .catch((e) => {
        console.error("Error loading municipios", e);
        toast.error("Erro ao carregar municípios");
      })
      .finally(() => setIsLoadingMunicipios(false));
  }, [uf, baseYear]);

  useEffect(() => {
    if (!municipioId) {
      setCategories([]);
      setCalculosFundeb(null);
      setDadosOriginais(null);
      setVariacoes(null);
      setDadosReaisMunicipio(null);
      setSelectedMunicipioData(null);
      initializeItems(0); // Limpar itens de receita
      isFirstLoadRef.current = true;
      lastMunicipioIdRef.current = "";
      lastBaseYearRef.current = "";
      return;
    }
    
    // Detectar mudança de município ou ano
    const municipioMudou = lastMunicipioIdRef.current !== municipioId;
    const anoMudou = baseYear && lastBaseYearRef.current !== baseYear;
    const municipioOuAnoMudou = municipioMudou || anoMudou;
    
    if (municipioOuAnoMudou) {
      if (municipioMudou) {
        console.log('🔄 [useEffect municipioId] Município mudou, resetando baseline');
      }
      if (anoMudou) {
        console.log(`🔄 [useEffect municipioId] Ano mudou de ${lastBaseYearRef.current} para ${baseYear}, resetando baseline`);
      }
      isFirstLoadRef.current = true;
      lastMunicipioIdRef.current = municipioId;
      if (baseYear) {
        lastBaseYearRef.current = baseYear;
      }
    }
    
    const selected = municipios.find((m) => m.id === municipioId);
    if (selected) {
      setSelectedMunicipioData({ municipio: selected.municipio, uf: selected.uf });
    }
    
    setIsLoadingCategorias(true);
    
    // Buscar dados reais do município (receita, complementações) do ano selecionado
    const anoSelecionado = baseYear ? parseInt(baseYear, 10) : undefined;
    console.log(`📅 [useEffect municipioId] Buscando dados para ano: ${anoSelecionado || 'não especificado'}`);
    LocalidadesService.getMunicipioCategorias(municipioId, anoSelecionado)
      .then((data) => {
        console.log(`📦 [useEffect municipioId] Dados recebidos do banco para ano ${anoSelecionado}:`, data);
        
        // Extrair dados reais de receita
        if (data.receita_contribuicao || data.complementacao_vaaf || data.complementacao_vaat || data.complementacao_vaar) {
          const dadosReais = {
            receitaContribuicao: data.receita_contribuicao || 0,
            complementacaoVAAF: data.complementacao_vaaf || 0,
            complementacaoVAAT: data.complementacao_vaat || 0,
            complementacaoVAAR: data.complementacao_vaar || 0,
            totalReceitasPrevistas: data.total_receitas_previstas || 0,
          };
          console.log('💰 [useEffect municipioId] Dados reais de receita encontrados:', dadosReais);
          setDadosReaisMunicipio(dadosReais);
          
          // Inicializar os itens de receita com os dados reais
          initializeItems(dadosReais.receitaContribuicao);
        } else {
          console.log('⚠️ [useEffect municipioId] Sem dados de receita no banco');
          setDadosReaisMunicipio(null);
          
          // Inicializar com valores vazios se não houver dados
          initializeItems(0);
        }
        
        const cats = data.matriculas_por_categoria || {};
        
        console.log(`📊 [useEffect municipioId] Matrículas por categoria para ano ${anoSelecionado}:`, cats);
        
        // Usar as 8 categorias agregadas do backend
        const mappedCategories: EnrollmentCategory[] = CATEGORIAS_AGREGADAS_ARRAY
          .map((catConfig, idx) => {
            // As categorias já vêm agregadas do backend: educacaoInfantil, anosIniciaisFund, etc.
            const totalMatriculas = cats[catConfig.id] || 0;
            const repasse = totalMatriculas * VALOR_ALUNO_ANO * catConfig.factor;
            
            return {
              id: catConfig.id,
              name: catConfig.label,
              subtitle: catConfig.description,
              enrollments: String(totalMatriculas),
              originalTransfer: new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(repasse),
              simulatedTransfer: new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(repasse),
            };
          });
        
        console.log(`📦 [useEffect municipioId] Categorias carregadas para ano ${anoSelecionado}, setando estado`);
        console.log(`📊 [useEffect municipioId] Total de matrículas: ${mappedCategories.reduce((sum, cat) => sum + (parseBrazilianInteger(cat.enrollments) || 0), 0)}`);
        setCategories(mappedCategories);
      })
      .catch((e) => {
        console.error("Error loading categorias", e);
        toast.error("Erro ao carregar categorias do município");
      })
      .finally(() => {
        setIsLoadingCategorias(false);
      });
  }, [municipioId, municipios, baseYear]); // Adicionar baseYear para recarregar quando ano mudar

  const handleSave = (): void => {
    if (!simulationName.trim()) {
      toast.error("Nome da simulação é obrigatório");
      return;
    }
    if (!municipioId || !selectedMunicipioData) {
      toast.error("Selecione um município");
      return;
    }

    if (categories.length === 0) {
      toast.error("Ao menos uma categoria deve ter valores");
      return;
    }

    const categoriasObj: Record<string, { matriculas: number; repasseOriginal: number; repasseSimulado: number }> = {};
    let hasInvalidValues = false;
    let hasSomeValue = false;

    categories.forEach((c) => {
      // Usar o ID da categoria diretamente (educacaoInfantil, anosIniciaisFund, etc.)
      const categoryId = c.id;
      
      const matriculas = parseBrazilianInteger(c.enrollments) || 0;
      const repasseOriginal = parseBrazilianNumber(c.originalTransfer) || 0;
      const repasseSimulado = parseBrazilianNumber(c.simulatedTransfer) || 0;
      
      if (matriculas < 0 || repasseOriginal < 0 || repasseSimulado < 0) {
        hasInvalidValues = true;
        return;
      }
      
      if (matriculas > 0) {
        hasSomeValue = true;
      }
      
      // Salvar ambos os valores de repasse usando o ID da categoria
      categoriasObj[categoryId] = { 
        matriculas, 
        repasseOriginal,
        repasseSimulado 
      };
    });

    if (hasInvalidValues) {
      toast.error("Valores numéricos devem ser maiores ou iguais a zero");
      return;
    }

    if (!hasSomeValue) {
      toast.error("Ao menos uma categoria deve ter matrículas maior que zero");
      return;
    }

    setIsSaving(true);

    const payload = {
      nome: simulationName,
      dadosEntrada: {
        anoBase: Number(baseYear),
        tipo: activeTab === "enrollment" ? "matriculas" : "receita",
        municipioId: municipioId,
        municipio: selectedMunicipioData.municipio,
        uf: selectedMunicipioData.uf,
        categorias: categoriasObj,
      },
    };

    console.log("Payload a ser enviado:", JSON.stringify(payload, null, 2));

    SimulationService.createSimulation(payload)
      .then(() => {
        toast.success("Simulação salva com sucesso!");
        setTimeout(() => {
          navigate("/app");
        }, 1000);
      })
      .catch((e: any) => {
        console.error("Error creating simulation", e);
        console.error("Payload enviado:", JSON.stringify(payload, null, 2));
        const status = e?.response?.status || e?.status;
        if (status === 401) {
          toast.error("Sessão expirada. Faça login novamente.");
          setTimeout(() => navigate("/login"), 1500);
        } else if (status === 400) {
          const errorMsg = e?.response?.data?.error || e?.response?.data?.message || e?.message || "Dados inválidos";
          console.error("Erro 400:", errorMsg);
          toast.error(`Erro de validação: ${errorMsg}`);
        } else {
          toast.error("Erro no servidor. Tente novamente mais tarde.");
        }
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  const handleCancel = (): void => {
    navigate("/app");
  };

  return (
    <section className="flex flex-col items-start gap-8 pt-8 pb-12 px-0 w-full bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(239,246,255,1)_50%,rgba(236,238,243,1)_100%)] min-h-screen">
      <div className="flex flex-col items-start gap-6 w-full px-4 md:px-6 lg:px-8">
        <SimulationHeader />

        <div className="w-full max-w-[1400px] mx-auto bg-white rounded-xl border border-solid border-[#e9e9eb] shadow-sm">
          <div className="p-6 md:p-8">
            <SimulationFormFields
              simulationName={simulationName}
              onNameChange={setSimulationName}
              baseYear={baseYear}
              onYearChange={setBaseYear}
              uf={uf}
              onUfChange={setUf}
              ufs={ufs}
              municipioId={municipioId}
              onMunicipioChange={setMunicipioId}
              municipios={municipios}
              isLoadingMunicipios={isLoadingMunicipios}
              canEditLocation={canEditLocation}
              anosDisponiveis={anosDisponiveis}
              isLoadingAnos={isLoadingAnos}
            />

            <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === "enrollment" ? (
              <>
                {isLoadingCategorias ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <span className="ml-3 text-gray-600">Carregando dados do município...</span>
                  </div>
                ) : (
                  <>
                    <EnrollmentForm
                      categories={categories}
                      onEnrollmentChange={handleEnrollmentChange}
                    />
                    
                    {isCalculating && (
                      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center">
                        <Loader2 className="h-5 w-5 animate-spin text-blue-600 mr-3" />
                        <span className="text-blue-700 font-medium">Calculando FUNDEB...</span>
                      </div>
                    )}
                    
                    {calculosFundeb && (
                      <div className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      📊 Cálculos FUNDEB Oficiais {dadosReaisMunicipio ? '(Lei nº 14.113/2020)' : '(Estimativa)'}
                    </h3>
                    
                    {dadosReaisMunicipio && (
                      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-800 font-semibold flex items-center">
                          <span className="mr-2">✅</span>
                          Implementação baseada no simuladorfundeb oficial (MEC/FNDE)
                        </p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-600 mb-1">Matrículas Ponderadas</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {calculosFundeb.matriculasPonderadas.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
                        </p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-600 mb-1">Repasse Total FUNDEB</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(calculosFundeb.repasseTotal)}
                        </p>
                      </div>
                    </div>
                    
                    {dadosReaisMunicipio && (
                      <>
                        {/* Valores por aluno (VAAF, VAAT, VAAR) */}
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-700 mb-3">Valores por Aluno/Ano:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg border border-green-200">
                              <p className="text-xs text-green-700 font-medium mb-1">VAAF - Valor Aluno Ano Fundeb</p>
                              <p className="text-xl font-bold text-green-700">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(calculosFundeb.vaafCalculado)}
                              </p>
                              <p className="text-xs text-green-600 mt-1">Mínimo: R$ {VAAF_MINIMO_2024.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
                            </div>
                            
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 rounded-lg border border-orange-200">
                              <p className="text-xs text-orange-700 font-medium mb-1">VAAT - Valor Aluno Ano Total</p>
                              <p className="text-xl font-bold text-orange-700">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(calculosFundeb.vaatCalculado)}
                              </p>
                              <p className="text-xs text-orange-600 mt-1">Mínimo: R$ 6.500,00</p>
                            </div>
                            
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg border border-purple-200">
                              <p className="text-xs text-purple-700 font-medium mb-1">VAAR - Valor Aluno Ano Resultado</p>
                              <p className="text-xl font-bold text-purple-700">
                                {calculosFundeb.vaarCalculado > 0 
                                  ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(calculosFundeb.vaarCalculado)
                                  : 'Não elegível'
                                }
                              </p>
                              <p className="text-xs text-purple-600 mt-1">
                                {calculosFundeb.vaarCalculado > 0 ? 'Por indicadores' : 'Condicionalidades'}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Composição do repasse */}
                        <div className="p-4 bg-white rounded-lg shadow-sm">
                          <h4 className="text-sm font-semibold text-gray-700 mb-3">Composição do Repasse Total:</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between py-1">
                              <span className="text-gray-600">Receita Base (20% impostos):</span>
                              <span className="font-semibold text-gray-900">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dadosReaisMunicipio.receitaContribuicao)}
                              </span>
                            </div>
                            <div className="flex justify-between py-1 bg-green-50 px-2 rounded">
                              <span className="text-green-700">+ Complementação VAAF:</span>
                              <span className="font-bold text-green-700">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(calculosFundeb.complementacaoVAAF)}
                              </span>
                            </div>
                            <div className="flex justify-between py-1 bg-orange-50 px-2 rounded">
                              <span className="text-orange-700">+ Complementação VAAT:</span>
                              <span className="font-bold text-orange-700">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(calculosFundeb.complementacaoVAAT)}
                              </span>
                            </div>
                            <div className="flex justify-between py-1 bg-purple-50 px-2 rounded">
                              <span className="text-purple-700">+ Complementação VAAR:</span>
                              <span className="font-bold text-purple-700">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(calculosFundeb.complementacaoVAAR)}
                              </span>
                            </div>
                            <div className="flex justify-between pt-3 mt-2 border-t-2 border-blue-300">
                              <span className="text-gray-800 font-bold text-base">= Repasse Total FUNDEB:</span>
                              <span className="font-bold text-blue-600 text-lg">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(calculosFundeb.repasseTotal)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {variacoes && dadosOriginais && (
                      <div className="mt-6 pt-6 border-t border-blue-200">
                        <h4 className="text-md font-semibold text-gray-700 mb-3">
                          📈 Variações (comparado aos dados originais)
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                            <p className="text-xs text-gray-600 mb-1">Variação Matrículas</p>
                            <p className={`text-3xl font-bold ${variacoes.matriculas >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {variacoes.matriculas >= 0 ? '+' : ''}{variacoes.matriculas.toFixed(2)}%
                            </p>
                          </div>
                          
                          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                            <p className="text-xs text-gray-600 mb-1">Variação Ponderadas</p>
                            <p className={`text-3xl font-bold ${variacoes.ponderadas >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {variacoes.ponderadas >= 0 ? '+' : ''}{variacoes.ponderadas.toFixed(2)}%
                            </p>
                          </div>
                          
                          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                            <p className="text-xs text-gray-600 mb-1">Variação Financeira</p>
                            <p className={`text-3xl font-bold ${variacoes.financeira >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {variacoes.financeira >= 0 ? '+' : ''}{variacoes.financeira.toFixed(2)}%
                            </p>
                          </div>
                          
                          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-4 rounded-lg shadow-md text-center text-white">
                            <p className="text-xs mb-1">Diferença Total</p>
                            <p className="text-2xl font-bold">
                              {calculosFundeb.repasseTotal > dadosOriginais.repasseTotal ? '+' : ''}
                              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(calculosFundeb.repasseTotal - dadosOriginais.repasseTotal)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-4 text-xs text-gray-500 space-y-1">
                      <p>• <strong>VAAF</strong>: Complementação baseada no valor mínimo nacional por aluno (R$ 5.447,98)</p>
                      <p>• <strong>VAAT</strong>: Complementação considerando receita total de educação</p>
                      <p>• <strong>VAAR</strong>: Complementação por resultados educacionais (condicionalidades)</p>
                      <p>• Implementação baseada no simuladorfundeb oficial (MEC/FNDE) - Lei nº 14.113/2020</p>
                      {variacoes && <p>• Variações calculadas automaticamente a cada alteração de matrícula</p>}
                    </div>
                  </div>
                )}
                  </>
                )}
              </>
            ) : (
              <RevenueForm
                items={items}
                onRevenueChange={handleRevenueChange}
              />
            )}

            <FormActions onCancel={handleCancel} onSave={handleSave} isSaving={isSaving} isCalculating={isCalculating} />
          </div>
        </div>
      </div>
    </section>
  );
};
