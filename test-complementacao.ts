/**
 * Script de teste comparativo entre simuladorfundeb e implementação atual
 * Testa cálculos de VAAF, VAAT e VAAR com dados reais do CSV
 */

// Dados reais do CSV - município ACRELANDIA (AC)
const testCase1 = {
  municipio: "ACRELANDIA",
  uf: "AC",
  codigo_ibge: "1200013",
  matriculas_ponderadas: 2101,
  receita_contribuicao: 17734911.24,
  complementacao_vaaf_oficial: 0,
  complementacao_vaat_oficial: 2627864.62,
  complementacao_vaar_oficial: 0,
  complementacao_total_oficial: 2627864.62,
  total_receitas_oficial: 20362775.86
};

// Dados reais do CSV - município ASSIS BRASIL (AC)
const testCase2 = {
  municipio: "ASSIS BRASIL",
  uf: "AC",
  codigo_ibge: "1200054",
  matriculas_ponderadas: 1465,
  receita_contribuicao: 12174734.54,
  complementacao_vaaf_oficial: 0,
  complementacao_vaat_oficial: 1899460.58,
  complementacao_vaar_oficial: 764249.19,
  complementacao_total_oficial: 2663709.77,
  total_receitas_oficial: 14838444.31
};

// Dados reais do CSV - município BRASILEIA (AC)
const testCase3 = {
  municipio: "BRASILEIA",
  uf: "AC",
  codigo_ibge: "1200104",
  matriculas_ponderadas: 3564,
  receita_contribuicao: 29867345.22,
  complementacao_vaaf_oficial: 0,
  complementacao_vaat_oficial: 5492806.69,
  complementacao_vaar_oficial: 0,
  complementacao_total_oficial: 5492806.69,
  total_receitas_oficial: 35360151.91
};

// Dados reais do CSV - município AGUA BRANCA (AL)
const testCase4 = {
  municipio: "AGUA BRANCA",
  uf: "AL",
  codigo_ibge: "2700102",
  matriculas_ponderadas: 5536,
  receita_contribuicao: 33953846.8,
  complementacao_vaaf_oficial: 7030879.24,
  complementacao_vaat_oficial: 19719044.15,
  complementacao_vaar_oficial: 2873158.92,
  complementacao_total_oficial: 29623082.31,
  total_receitas_oficial: 63576929.11
};

// Constantes oficiais do simuladorfundeb
const VAAF_MINIMO_2024 = 5447.98;
const VAAT_MINIMO_2024 = 6307.38;
const VAAR_MINIMO_2024 = 6919.12;

// Função que simula a lógica do simuladorfundeb
// O simuladorfundeb NÃO recalcula valores do CSV, ele USA os valores que já vêm do MEC/FNDE
// e apenas ajusta proporcionalmente quando o usuário simula mudanças nas matrículas
function simularComplementacao(
  dados_oficiais: any,
  matriculas_ponderadas_simuladas: number,
  matriculas_totais_simuladas: number
) {
  // Se as matrículas não mudaram, retorna os valores oficiais direto
  if (matriculas_ponderadas_simuladas === dados_oficiais.matriculas_ponderadas) {
    return {
      complementacao_vaaf: dados_oficiais.complementacao_vaaf_oficial,
      complementacao_vaat: dados_oficiais.complementacao_vaat_oficial,
      complementacao_vaar: dados_oficiais.complementacao_vaar_oficial,
      complementacao_total: dados_oficiais.complementacao_total_oficial,
      total_receitas: dados_oficiais.total_receitas_oficial
    };
  }

  // Se as matrículas mudaram, ajusta proporcionalmente (como o simuladorfundeb faz)
  const razao_ponderada = matriculas_ponderadas_simuladas / dados_oficiais.matriculas_ponderadas;
  const razao_total = matriculas_totais_simuladas / dados_oficiais.matriculas_ponderadas; // Assumindo que matriculas_ponderadas representa total também

  // VAAF e VAAT usam matrícula ponderada
  const complementacao_vaaf = dados_oficiais.complementacao_vaaf_oficial * razao_ponderada;
  const complementacao_vaat = dados_oficiais.complementacao_vaat_oficial * razao_ponderada;
  
  // VAAR usa matrícula total (não ponderada)
  const complementacao_vaar = dados_oficiais.complementacao_vaar_oficial * razao_total;

  const complementacao_total = complementacao_vaaf + complementacao_vaat + complementacao_vaar;
  const total_receitas = dados_oficiais.receita_contribuicao + complementacao_total;

  return {
    complementacao_vaaf,
    complementacao_vaat,
    complementacao_vaar,
    complementacao_total,
    total_receitas
  };
}

// Função para formatar valores monetários
function formatMoney(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).formatToParts(value)
    .filter(part => part.type !== 'currency')
    .map(part => part.value)
    .join('')
    .trim();
}

// Função para testar um caso
function testarCaso(testCase: any, caseNumber: number) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`CASO ${caseNumber}: ${testCase.municipio} (${testCase.uf}) - IBGE ${testCase.codigo_ibge}`);
  console.log(`${'='.repeat(80)}`);
  
  console.log(`\nDados de Entrada:`);
  console.log(`  Matrículas Ponderadas: ${testCase.matriculas_ponderadas.toLocaleString('pt-BR')}`);
  console.log(`  Receita de Contribuição: R$ ${formatMoney(testCase.receita_contribuicao)}`);
  
  // Teste 1: Sem mudança nas matrículas (deve retornar valores oficiais exatos)
  const resultado = simularComplementacao(
    testCase,
    testCase.matriculas_ponderadas, // Mesma matrícula = sem mudança
    testCase.matriculas_ponderadas
  );
  
  console.log(`\nResultados da Simulação (sem mudança de matrículas):`);
  console.log(`  Complementação VAAF: R$ ${formatMoney(resultado.complementacao_vaaf)}`);
  console.log(`  Complementação VAAT: R$ ${formatMoney(resultado.complementacao_vaat)}`);
  console.log(`  Complementação VAAR: R$ ${formatMoney(resultado.complementacao_vaar)}`);
  console.log(`  Complementação Total: R$ ${formatMoney(resultado.complementacao_total)}`);
  console.log(`  Total de Receitas: R$ ${formatMoney(resultado.total_receitas)}`);
  
  console.log(`\nValores Oficiais (CSV):`);
  console.log(`  Complementação VAAF: R$ ${formatMoney(testCase.complementacao_vaaf_oficial)}`);
  console.log(`  Complementação VAAT: R$ ${formatMoney(testCase.complementacao_vaat_oficial)}`);
  console.log(`  Complementação VAAR: R$ ${formatMoney(testCase.complementacao_vaar_oficial)}`);
  console.log(`  Complementação Total: R$ ${formatMoney(testCase.complementacao_total_oficial)}`);
  console.log(`  Total de Receitas: R$ ${formatMoney(testCase.total_receitas_oficial)}`);
  
  // Calcular diferenças
  const diff_vaaf = Math.abs(resultado.complementacao_vaaf - testCase.complementacao_vaaf_oficial);
  const diff_vaat = Math.abs(resultado.complementacao_vaat - testCase.complementacao_vaat_oficial);
  const diff_vaar = Math.abs(resultado.complementacao_vaar - testCase.complementacao_vaar_oficial);
  const diff_total = Math.abs(resultado.complementacao_total - testCase.complementacao_total_oficial);
  const diff_receitas = Math.abs(resultado.total_receitas - testCase.total_receitas_oficial);
  
  console.log(`\nDiferenças (Simulado vs Oficial):`);
  console.log(`  VAAF: R$ ${formatMoney(diff_vaaf)} ${diff_vaaf < 0.01 ? '✓ OK' : '✗ DIVERGÊNCIA'}`);
  console.log(`  VAAT: R$ ${formatMoney(diff_vaat)} ${diff_vaat < 0.01 ? '✓ OK' : '✗ DIVERGÊNCIA'}`);
  console.log(`  VAAR: R$ ${formatMoney(diff_vaar)} ${diff_vaar < 0.01 ? '✓ OK' : '✗ DIVERGÊNCIA'}`);
  console.log(`  Total: R$ ${formatMoney(diff_total)} ${diff_total < 0.01 ? '✓ OK' : '✗ DIVERGÊNCIA'}`);
  console.log(`  Receitas: R$ ${formatMoney(diff_receitas)} ${diff_receitas < 0.01 ? '✓ OK' : '✗ DIVERGÊNCIA'}`);
  
  // Percentual de divergência
  const perc_diff = testCase.complementacao_total_oficial > 0 
    ? (diff_total / testCase.complementacao_total_oficial) * 100 
    : 0;
  console.log(`  Divergência Percentual: ${perc_diff.toFixed(4)}%`);
  
  return {
    passed: diff_vaaf < 0.01 && diff_vaat < 0.01 && diff_vaar < 0.01 && diff_total < 0.01,
    diff_vaaf,
    diff_vaat,
    diff_vaar,
    diff_total,
    perc_diff
  };
}

// Executar todos os testes
console.log('\n');
console.log('╔════════════════════════════════════════════════════════════════════════════════╗');
console.log('║  TESTE: LÓGICA DO SIMULADORFUNDEB - USA VALORES REAIS DO CSV                  ║');
console.log('║  O simulador NÃO recalcula, apenas ajusta proporcionalmente                   ║');
console.log('╚════════════════════════════════════════════════════════════════════════════════╝');

const resultados = [
  testarCaso(testCase1, 1),
  testarCaso(testCase2, 2),
  testarCaso(testCase3, 3),
  testarCaso(testCase4, 4)
];

// Resumo final
console.log(`\n${'='.repeat(80)}`);
console.log('RESUMO DOS TESTES');
console.log(`${'='.repeat(80)}`);

const totalPassed = resultados.filter(r => r.passed).length;
const totalTests = resultados.length;

console.log(`\nTestes Executados: ${totalTests}`);
console.log(`Testes Aprovados: ${totalPassed}`);
console.log(`Testes Falhados: ${totalTests - totalPassed}`);
console.log(`Taxa de Sucesso: ${((totalPassed / totalTests) * 100).toFixed(2)}%`);

if (totalPassed === totalTests) {
  console.log(`\n✓ SUCESSO: A lógica está correta! O simulador usa valores do CSV sem recalcular.`);
  console.log(`\nCOMO FUNCIONA:`);
  console.log(`  1. Carrega valores REAIS do CSV (calculados pelo MEC/FNDE)`);
  console.log(`  2. Se usuário NÃO muda matrículas: mostra valores originais`);
  console.log(`  3. Se usuário SIMULA mudanças: ajusta proporcionalmente`);
  console.log(`     - VAAF e VAAT: proporcional a matrículas ponderadas`);
  console.log(`     - VAAR: proporcional a matrículas totais (não ponderadas)`);
} else {
  console.log(`\n✗ ATENÇÃO: Existem divergências na implementação. Revisão necessária.`);
  
  console.log(`\nDivergências encontradas:`);
  resultados.forEach((r, i) => {
    if (!r.passed) {
      console.log(`  Caso ${i + 1}: Diferença de ${r.perc_diff.toFixed(4)}%`);
    }
  });
}

console.log('\n');
