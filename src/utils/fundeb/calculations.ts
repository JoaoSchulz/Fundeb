/**
 * Cálculos oficiais do FUNDEB baseados na Lei nº 14.113/2020
 * Implementação baseada no simuladorfundeb com aproximações necessárias
 */

import {
  FUNDEB_2024_MINIMUMS,
  PONDERACOES_AGREGADAS,
  RECEITA_TOTAL_MULTIPLIER,
  OUTRAS_RECEITAS_EDUCACIONAIS_PERCENTAGE,
  type MatriculasAgregadas,
  type DadosReaisMunicipio,
} from './constants';

/**
 * Interface para resultado de simulação oficial
 */
export interface ResultadoSimulacaoOficial {
  // Matrículas
  matriculasReais: number;
  matriculasSimuladas: number;
  matriculasPonderadasReais: number;
  matriculasPonderadasSimuladas: number;

  // VAAF (Valor Aluno Ano Fundeb)
  vaafReal: number;
  vaafSimulado: number;
  complementacaoVAAFReal: number;
  complementacaoVAAFSimulada: number;

  // VAAT (Valor Aluno Ano Total)
  vaatReal: number;
  vaatSimulado: number;
  complementacaoVAATReal: number;
  complementacaoVAATSimulada: number;

  // VAAR (Valor Aluno Ano de Resultado)
  vaarReal: number;
  vaarSimulado: number;
  complementacaoVAARReal: number;
  complementacaoVAARSimulada: number;

  // Repasses totais
  repasseTotalReal: number;
  repasseTotalSimulado: number;
  diferencaAbsoluta: number;
  diferencaPercentual: number;

  // Flags
  recebeVAAF: boolean;
  recebeVAAT: boolean;
  recebeVAAR: boolean;
  matriculasIdenticas: boolean;
}

/**
 * Calcula matrículas ponderadas aplicando fatores por modalidade
 * Implementa o Art. 15 da Lei 14.113/2020
 *
 * @param matriculas - Matrículas agregadas por modalidade
 * @returns Total de matrículas ponderadas
 */
export function calculateWeightedEnrollment(
  matriculas: MatriculasAgregadas
): number {
  const ponderado =
    matriculas.creche * PONDERACOES_AGREGADAS.CRECHE +
    matriculas.preEscola * PONDERACOES_AGREGADAS.PRE_ESCOLA +
    matriculas.anosIniciais * PONDERACOES_AGREGADAS.ANOS_INICIAIS +
    matriculas.anosFinais * PONDERACOES_AGREGADAS.ANOS_FINAIS +
    matriculas.ensinoMedio * PONDERACOES_AGREGADAS.ENSINO_MEDIO +
    matriculas.eja * PONDERACOES_AGREGADAS.EJA +
    matriculas.educacaoEspecial * PONDERACOES_AGREGADAS.EDUCACAO_ESPECIAL +
    matriculas.educacaoIndígenaQuilombola *
      PONDERACOES_AGREGADAS.EDUCACAO_INDIGENA_QUILOMBOLA;

  return Math.round(ponderado * 100) / 100; // Arredonda para 2 casas decimais
}

/**
 * Calcula o total simples de matrículas (sem ponderação)
 *
 * @param matriculas - Matrículas agregadas por modalidade
 * @returns Total de matrículas
 */
export function calculateTotalEnrollment(
  matriculas: MatriculasAgregadas
): number {
  return (
    matriculas.creche +
    matriculas.preEscola +
    matriculas.anosIniciais +
    matriculas.anosFinais +
    matriculas.ensinoMedio +
    matriculas.eja +
    matriculas.educacaoEspecial +
    matriculas.educacaoIndígenaQuilombola
  );
}

/**
 * Verifica se duas estruturas de matrículas são idênticas
 * Usado para detectar se usuário modificou as matrículas ou apenas carregou dados reais
 *
 * @param m1 - Primeira estrutura de matrículas
 * @param m2 - Segunda estrutura de matrículas
 * @returns true se todas as modalidades têm valores idênticos
 */
export function areMatriculasIdentical(
  m1: MatriculasAgregadas,
  m2: MatriculasAgregadas
): boolean {
  return (
    m1.creche === m2.creche &&
    m1.preEscola === m2.preEscola &&
    m1.anosIniciais === m2.anosIniciais &&
    m1.anosFinais === m2.anosFinais &&
    m1.ensinoMedio === m2.ensinoMedio &&
    m1.eja === m2.eja &&
    m1.educacaoEspecial === m2.educacaoEspecial &&
    m1.educacaoIndígenaQuilombola === m2.educacaoIndígenaQuilombola
  );
}

/**
 * Calcula VAAF (Valor Aluno Ano Fundeb) - Art. 5º, I da Lei 14.113/2020
 * VAAF é a complementação da União para garantir valor mínimo nacional por aluno
 *
 * Implementação:
 * 1. Calcula valor por aluno = receita_contribuicao / matriculas_ponderadas
 * 2. Compara com VAAF_MIN nacional (R$ 5.447,98 em 2024)
 * 3. Se menor, complementa a diferença multiplicada pelas matrículas ponderadas
 *
 * @param receitaContribuicao - Receita de contribuição municipal ao FUNDEB (20% dos impostos)
 * @param matriculasPonderadas - Total de matrículas com ponderações aplicadas
 * @returns Objeto com valor por aluno e complementação VAAF
 */
export function calculateOfficialVAAF(
  receitaContribuicao: number,
  matriculasPonderadas: number
): {
  valorPorAluno: number;
  complementacao: number;
  recebeComplementacao: boolean;
} {
  if (matriculasPonderadas === 0) {
    return { valorPorAluno: 0, complementacao: 0, recebeComplementacao: false };
  }

  // Calcula valor por aluno baseado na receita de contribuição
  const valorPorAluno = receitaContribuicao / matriculasPonderadas;

  // Verifica se está abaixo do mínimo nacional
  const recebeComplementacao = valorPorAluno < FUNDEB_2024_MINIMUMS.VAAF_MIN;

  // Calcula complementação necessária
  const complementacao = recebeComplementacao
    ? (FUNDEB_2024_MINIMUMS.VAAF_MIN - valorPorAluno) * matriculasPonderadas
    : 0;

  return {
    valorPorAluno: Math.round(valorPorAluno * 100) / 100,
    complementacao: Math.round(complementacao * 100) / 100,
    recebeComplementacao,
  };
}

/**
 * Calcula VAAT (Valor Aluno Ano Total) - Art. 5º, II da Lei 14.113/2020
 * VAAT complementa municípios com baixa capacidade de arrecadação total
 *
 * APROXIMAÇÃO baseada no simuladorfundeb oficial do MEC/FNDE:
 * A fórmula oficial requer receita total de educação (FUNDEB + 5% restante dos impostos
 * + Salário-Educação + Programas FNDE + outras fontes). Como não temos todos esses dados,
 * fazemos aproximação baseada em observação do simuladorfundeb:
 *
 * receitaTotalEducacao ≈ receitaContribuicao × 5 + complementacaoVAAF + (receitaContribuicao × 0.1)
 *
 * Justificativa:
 * - receitaContribuicao representa 20% dos impostos, então × 5 = 100%
 * - + complementacaoVAAF (se recebe)
 * - + 10% adicional estimado para Salário-Educação e outros programas
 *
 * @param receitaContribuicao - Receita de contribuição municipal ao FUNDEB
 * @param matriculasPonderadas - Total de matrículas ponderadas
 * @param complementacaoVAAF - Complementação VAAF já calculada
 * @param complementacaoVAATReal - Complementação VAAT real do município (dados oficiais)
 * @returns Objeto com valor por aluno e complementação VAAT
 */
export function calculateOfficialVAAT(
  receitaContribuicao: number,
  matriculasPonderadas: number,
  complementacaoVAAF: number,
  complementacaoVAATReal: number = 0
): {
  valorPorAluno: number;
  complementacao: number;
  recebeComplementacao: boolean;
  receitaTotalEstimada: number;
} {
  if (matriculasPonderadas === 0) {
    return {
      valorPorAluno: 0,
      complementacao: 0,
      recebeComplementacao: false,
      receitaTotalEstimada: 0,
    };
  }

  // Aproximação da receita total de educação
  // Baseado na metodologia do simuladorfundeb oficial
  const receitaTotalEstimada =
    receitaContribuicao * RECEITA_TOTAL_MULTIPLIER + // 100% dos impostos (base × 5)
    complementacaoVAAF + // + complementação VAAF calculada
    receitaContribuicao * OUTRAS_RECEITAS_EDUCACIONAIS_PERCENTAGE; // + 10% estimado (Salário-Educação, etc.)

  // Calcula valor por aluno total
  const valorPorAluno = receitaTotalEstimada / matriculasPonderadas;

  // Verifica se está abaixo do mínimo VAAT
  const recebeComplementacao = valorPorAluno < FUNDEB_2024_MINIMUMS.VAAT_MIN;

  // Calcula complementação necessária
  let complementacao: number;
  
  if (recebeComplementacao) {
    // Se está abaixo do mínimo, calcula complementação necessária
    complementacao = (FUNDEB_2024_MINIMUMS.VAAT_MIN - valorPorAluno) * matriculasPonderadas;
  } else if (complementacaoVAATReal > 0) {
    // Se já está acima do mínimo mas recebe VAAT nos dados reais,
    // usa a complementação real (município pode receber mesmo acima do mínimo por critérios especiais)
    complementacao = complementacaoVAATReal;
  } else {
    complementacao = 0;
  }

  return {
    valorPorAluno: Math.round(valorPorAluno * 100) / 100,
    complementacao: Math.round(complementacao * 100) / 100,
    recebeComplementacao: recebeComplementacao || complementacaoVAATReal > 0,
    receitaTotalEstimada: Math.round(receitaTotalEstimada * 100) / 100,
  };
}

/**
 * Calcula VAAR (Valor Aluno Ano de Resultado) - Art. 5º, III da Lei 14.113/2020
 * VAAR premia municípios que melhoram indicadores educacionais
 *
 * APROXIMAÇÃO baseada no simuladorfundeb oficial do MEC/FNDE:
 * A fórmula oficial requer indicadores de qualidade (fd, fp, fs) baseados em:
 * - fd: disponibilidade de recursos (receita per capita)
 * - fp: potencial de arrecadação tributária
 * - fs: nível socioeconômico
 * - Resultados educacionais: IDEB, aprovação, distorção idade-série, etc.
 *
 * Como não temos dados para calcular esses indicadores, seguimos a mesma aproximação
 * do simuladorfundeb oficial:
 * - Se o município já recebe VAAR nos dados reais (complementacaoVAAR > 0), assumimos que
 *   continuará recebendo e escalamos proporcionalmente ao número de alunos TOTAIS (não ponderados)
 * - VAAR usa matrícula total, não ponderada, conforme observado no simuladorfundeb
 *
 * Fórmula aproximada (baseada em fundeb-official-rules.js):
 * complementacaoVAARSimulada = complementacaoVAARReal × (matriculasTotaisSimuladas / matriculasTotaisReais)
 *
 * @param complementacaoVAARReal - Valor VAAR real recebido pelo município (dos dados oficiais)
 * @param matriculasTotaisReais - Matrículas totais atuais (dados reais, SEM ponderação)
 * @param matriculasTotaisSimuladas - Matrículas totais simuladas (SEM ponderação)
 * @returns Objeto com valor por aluno e complementação VAAR
 */
export function calculateOfficialVAAR(
  complementacaoVAARReal: number,
  matriculasTotaisReais: number,
  matriculasTotaisSimuladas: number
): {
  valorPorAluno: number;
  complementacao: number;
  recebeComplementacao: boolean;
} {
  // Se não recebe VAAR nos dados reais, não receberá na simulação
  // VAAR depende de condicionalidades e indicadores que não são simuláveis
  if (
    complementacaoVAARReal === 0 ||
    matriculasTotaisReais === 0 ||
    matriculasTotaisSimuladas === 0
  ) {
    return {
      valorPorAluno: 0,
      complementacao: 0,
      recebeComplementacao: false,
    };
  }

  // Calcula valor por aluno real (baseado em matrícula total, não ponderada)
  const valorPorAlunoReal = complementacaoVAARReal / matriculasTotaisReais;

  // Escala proporcionalmente para matrículas simuladas
  // Implementação idêntica ao simuladorfundeb (fundeb-official-rules.js, linha 164-166)
  const complementacaoSimulada = complementacaoVAARReal * (matriculasTotaisSimuladas / matriculasTotaisReais);

  return {
    valorPorAluno: Math.round(valorPorAlunoReal * 100) / 100,
    complementacao: Math.round(complementacaoSimulada * 100) / 100,
    recebeComplementacao: true,
  };
}

/**
 * Executa simulação completa com cálculos oficiais do FUNDEB
 * Compara dados reais com dados simulados
 *
 * @param dadosReais - Dados oficiais do município (do banco de dados)
 * @param matriculasSimuladas - Matrículas modificadas pelo usuário na simulação
 * @returns Resultado completo da simulação com todas as comparações
 */
export function runOfficialFUNDEBSimulation(
  dadosReais: DadosReaisMunicipio,
  matriculasSimuladas: MatriculasAgregadas
): ResultadoSimulacaoOficial {
  // 1. Extrair matrículas reais do municípioUSANDO o campo matriculasTotal do banco
  // Se o banco tem matriculasPorCategoria preenchido, agregar em modalidades
  // Caso contrário, usar matriculasTotal como fallback
  const matriculasReaisAgregadas: MatriculasAgregadas = 
    Object.keys(dadosReais.matriculasPorCategoria || {}).length > 0
      ? agregarMatriculas(dadosReais.matriculasPorCategoria)
      : {
          // Fallback: distribuir proporcionalmente baseado nas matrículas simuladas
          creche: 0,
          preEscola: 0,
          anosIniciais: 0,
          anosFinais: 0,
          ensinoMedio: 0,
          eja: 0,
          educacaoEspecial: 0,
          educacaoIndígenaQuilombola: 0
        };

  // 2. Calcular matrículas ponderadas (reais e simuladas)
  const matriculasPonderadasReais = calculateWeightedEnrollment(
    matriculasReaisAgregadas
  );
  const matriculasPonderadasSimuladas = calculateWeightedEnrollment(
    matriculasSimuladas
  );

  const matriculasReaisTotal = dadosReais.matriculasTotal || calculateTotalEnrollment(
    matriculasReaisAgregadas
  );
  const matriculasSimuladasTotal = calculateTotalEnrollment(
    matriculasSimuladas
  );

  // 3. Verificar se matrículas simuladas estão vazias (primeiro carregamento)
  const matriculasSimuladasVazias = matriculasSimuladasTotal === 0;

  // 4. Para cenário REAL: Usar valores do banco de dados (calculados pelo MEC/FNDE)
  // Não tentamos recalcular esses valores, pois dependem de dados que não temos acesso
  // (receitas totais de educação, indicadores de qualidade, etc.)
  const vaafReal = {
    valorPorAluno: dadosReais.complementacaoVAAF / (matriculasPonderadasReais || 1),
    complementacao: dadosReais.complementacaoVAAF,
    recebeComplementacao: dadosReais.complementacaoVAAF > 0
  };

  const vaatReal = {
    valorPorAluno: dadosReais.complementacaoVAAT / (matriculasPonderadasReais || 1),
    complementacao: dadosReais.complementacaoVAAT,
    recebeComplementacao: dadosReais.complementacaoVAAT > 0,
    receitaTotalEstimada: dadosReais.totalReceitas || dadosReais.receitaContribuicao
  };

  const vaarReal = {
    valorPorAluno: dadosReais.complementacaoVAAR / (matriculasReaisTotal || 1),
    complementacao: dadosReais.complementacaoVAAR,
    recebeComplementacao: dadosReais.complementacaoVAAR > 0
  };

  // CASO ESPECIAL: Se matriculasSimuladas está vazia (todas zeradas), 
  // significa que é o primeiro carregamento e devemos retornar valores originais do banco
  if (matriculasSimuladasVazias) {
    // Primeiro carregamento: retorna valores originais do banco sem simulação
    const repasseTotal = dadosReais.receitaContribuicao + 
      vaafReal.complementacao + 
      vaatReal.complementacao + 
      vaarReal.complementacao;
      
    return {
      matriculasReais: matriculasReaisTotal,
      matriculasSimuladas: matriculasReaisTotal,
      matriculasPonderadasReais: matriculasPonderadasReais || matriculasReaisTotal,
      matriculasPonderadasSimuladas: matriculasPonderadasReais || matriculasReaisTotal,
      
      vaafReal: vaafReal.valorPorAluno,
      vaafSimulado: vaafReal.valorPorAluno,
      complementacaoVAAFReal: vaafReal.complementacao,
      complementacaoVAAFSimulada: vaafReal.complementacao,
      
      vaatReal: vaatReal.valorPorAluno,
      vaatSimulado: vaatReal.valorPorAluno,
      complementacaoVAATReal: vaatReal.complementacao,
      complementacaoVAATSimulada: vaatReal.complementacao,
      
      vaarReal: vaarReal.valorPorAluno,
      vaarSimulado: vaarReal.valorPorAluno,
      complementacaoVAARReal: vaarReal.complementacao,
      complementacaoVAARSimulada: vaarReal.complementacao,
      
      repasseTotalReal: repasseTotal,
      repasseTotalSimulado: repasseTotal,
      diferencaAbsoluta: 0,
      diferencaPercentual: 0,
      
      recebeVAAF: vaafReal.recebeComplementacao,
      recebeVAAT: vaatReal.recebeComplementacao,
      recebeVAAR: vaarReal.recebeComplementacao,
      matriculasIdenticas: true,
    };
  }
  
  // 5. Calcular proporção para simulação
  // Se não temos matrículas agregadas do banco, usamos o total simples
  const usarTotalSimples = matriculasPonderadasReais === 0;
  
  let razao = 1;
  
  if (usarTotalSimples) {
    // Calcula razão baseada em matrículas totais simples
    const totalSimuladoCalculado = calculateTotalEnrollment(matriculasSimuladas);
    razao = matriculasReaisTotal > 0 
      ? totalSimuladoCalculado / matriculasReaisTotal 
      : 1;
  } else {
    // Calcula razão baseada em matrículas ponderadas
    razao = matriculasPonderadasReais > 0 
      ? matriculasPonderadasSimuladas / matriculasPonderadasReais 
      : 1;
  }

  // Verifica se houve mudança nas matrículas (tolerância de 0.1%)
  const mudancaSignificativa = Math.abs(razao - 1) > 0.001;

  // 6. Para cenário SIMULADO: Ajustar valores proporcionalmente às matrículas
  // Implementação idêntica ao simuladorfundeb oficial (fundeb-official-rules.js)
  let vaafSimulado, vaatSimulado, vaarSimulado;

  if (!mudancaSignificativa) {
    // Se matrículas não mudaram significativamente, mantém valores originais
    vaafSimulado = { ...vaafReal };
    vaatSimulado = { ...vaatReal };
    vaarSimulado = { ...vaarReal };
  } else {
    // Se matrículas mudaram, ajusta proporcionalmente
    vaafSimulado = {
      valorPorAluno: vaafReal.valorPorAluno,
      complementacao: vaafReal.complementacao * razao,
      recebeComplementacao: vaafReal.recebeComplementacao
    };

    vaatSimulado = {
      valorPorAluno: vaatReal.valorPorAluno,
      complementacao: vaatReal.complementacao * razao,
      recebeComplementacao: vaatReal.recebeComplementacao,
      receitaTotalEstimada: vaatReal.receitaTotalEstimada * razao
    };

    vaarSimulado = {
      valorPorAluno: vaarReal.valorPorAluno,
      complementacao: vaarReal.complementacao * razao,
      recebeComplementacao: vaarReal.recebeComplementacao
    };
  }

  // 7. Calcular repasses totais
  const repasseTotalReal =
    dadosReais.receitaContribuicao +
    vaafReal.complementacao +
    vaatReal.complementacao +
    vaarReal.complementacao;

  const repasseTotalSimulado =
    dadosReais.receitaContribuicao + // Receita base não muda
    vaafSimulado.complementacao +
    vaatSimulado.complementacao +
    vaarSimulado.complementacao;

  // 8. Calcular diferenças
  const diferencaAbsoluta = repasseTotalSimulado - repasseTotalReal;
  const diferencaPercentual =
    repasseTotalReal > 0
      ? ((diferencaAbsoluta / repasseTotalReal) * 100)
      : 0;

  // 9. Montar resultado completo
  return {
    // Matrículas
    matriculasReais: matriculasReaisTotal,
    matriculasSimuladas: matriculasSimuladasTotal,
    matriculasPonderadasReais,
    matriculasPonderadasSimuladas,

    // VAAF
    vaafReal: vaafReal.valorPorAluno,
    vaafSimulado: vaafSimulado.valorPorAluno,
    complementacaoVAAFReal: vaafReal.complementacao,
    complementacaoVAAFSimulada: vaafSimulado.complementacao,

    // VAAT
    vaatReal: vaatReal.valorPorAluno,
    vaatSimulado: vaatSimulado.valorPorAluno,
    complementacaoVAATReal: vaatReal.complementacao,
    complementacaoVAATSimulada: vaatSimulado.complementacao,

    // VAAR
    vaarReal: vaarReal.valorPorAluno,
    vaarSimulado: vaarSimulado.valorPorAluno,
    complementacaoVAARReal: vaarReal.complementacao,
    complementacaoVAARSimulada: vaarSimulado.complementacao,

    // Totais
    repasseTotalReal: Math.round(repasseTotalReal * 100) / 100,
    repasseTotalSimulado: Math.round(repasseTotalSimulado * 100) / 100,
    diferencaAbsoluta: Math.round(diferencaAbsoluta * 100) / 100,
    diferencaPercentual: Math.round(diferencaPercentual * 100) / 100,

    // Flags
    recebeVAAF: vaafSimulado.recebeComplementacao,
    recebeVAAT: vaatSimulado.recebeComplementacao,
    recebeVAAR: vaarSimulado.recebeComplementacao,
    matriculasIdenticas: !mudancaSignificativa,
  };
}

/**
 * Função auxiliar para formatar valores monetários
 * @param valor - Valor em reais
 * @returns String formatada (ex: "R$ 1.234.567,89")
 */
export function formatarValorMonetario(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor);
}

/**
 * Função auxiliar para formatar percentuais
 * @param valor - Valor percentual
 * @returns String formatada (ex: "+15,5%" ou "-3,2%")
 */
export function formatarPercentual(valor: number): string {
  const sinal = valor >= 0 ? '+' : '';
  return `${sinal}${valor.toFixed(2)}%`;
}

/**
 * Função auxiliar para agregar matrículas do JSONB em modalidades
 * Esta é uma versão simplificada - a versão completa estará no backend
 *
 * @param matriculasPorCategoria - Objeto JSONB com 70+ categorias
 * @returns MatriculasAgregadas com 8 modalidades principais
 */
export function agregarMatriculas(
  matriculasPorCategoria: Record<string, number>
): MatriculasAgregadas {
  const agregadas: MatriculasAgregadas = {
    creche: 0,
    preEscola: 0,
    anosIniciais: 0,
    anosFinais: 0,
    ensinoMedio: 0,
    eja: 0,
    educacaoEspecial: 0,
    educacaoIndígenaQuilombola: 0,
  };

  // Mapeamento simplificado - deve ser expandido com todas as 70+ categorias
  for (const [categoria, valor] of Object.entries(matriculasPorCategoria)) {
    const categoriaLower = categoria.toLowerCase();

    if (categoriaLower.includes('creche')) {
      agregadas.creche += valor;
    } else if (categoriaLower.includes('pre') || categoriaLower.includes('pré')) {
      agregadas.preEscola += valor;
    } else if (categoriaLower.includes('iniciais')) {
      agregadas.anosIniciais += valor;
    } else if (categoriaLower.includes('finais')) {
      agregadas.anosFinais += valor;
    } else if (categoriaLower.includes('medio') || categoriaLower.includes('médio')) {
      agregadas.ensinoMedio += valor;
    } else if (categoriaLower.includes('eja')) {
      agregadas.eja += valor;
    } else if (categoriaLower.includes('especial')) {
      agregadas.educacaoEspecial += valor;
    } else if (
      categoriaLower.includes('indigena') ||
      categoriaLower.includes('indígena') ||
      categoriaLower.includes('quilombola')
    ) {
      agregadas.educacaoIndígenaQuilombola += valor;
    }
  }

  return agregadas;
}
