/**
 * Teste real da implementação com dados do banco
 * Compara com valores esperados do CSV
 */

import { runOfficialFUNDEBSimulation } from './src/utils/fundeb/calculations';
import type { DadosReaisMunicipio, MatriculasAgregadas } from './src/utils/fundeb/constants';

// Dados reais do município ACRELANDIA - AC (do CSV)
const municipioACRELANDIA: DadosReaisMunicipio = {
  uf: 'AC',
  municipio: 'ACRELANDIA',
  codigoIbge: '1200013',
  receitaContribuicao: 17734911.24,
  receitaTotal: 20362775.86,
  totalReceitas: 20362775.86,
  matriculasTotal: 2101,
  matriculasPorCategoria: {}, // Simplificado para teste
  indicadoresVAAF: 0,
  indicadoresVAAT: 0,
  indicadoresVAAR: 0,
  complementacaoVAAF: 0,
  complementacaoVAAT: 2627864.62,
  complementacaoVAAR: 0
};

// IMPORTANTE: Para o teste funcionar corretamente, as matrículas "originais" que passamos
// devem ser EXATAMENTE as mesmas que estão no banco. Como não temos acesso às matrículas
// agregadas reais do banco neste teste, vamos simular carregando um objeto vazio,
// o que fará o sistema usar matriculasTotal do banco (2101) como referência.

const matriculasOriginaisCarregadasDoBanco: MatriculasAgregadas = {
  creche: 0,
  preEscola: 0,
  anosIniciais: 0,
  anosFinais: 0,
  ensinoMedio: 0,
  eja: 0,
  educacaoEspecial: 0,
  educacaoIndígenaQuilombola: 0
}; // Representa que ainda não carregamos matrículas detalhadas

console.log('\n╔════════════════════════════════════════════════════════════════════════════════╗');
console.log('║  TESTE REAL: IMPLEMENTAÇÃO COM DADOS DO BANCO                                  ║');
console.log('╚════════════════════════════════════════════════════════════════════════════════╝\n');

console.log('Município: ACRELANDIA - AC');
console.log('Código IBGE: 1200013\n');

// Teste 1: Sem mudança de matrículas
console.log('─'.repeat(80));
console.log('TESTE 1: SEM MUDANÇA DE MATRÍCULAS (deve retornar valores originais)');
console.log('─'.repeat(80));

const resultado1 = runOfficialFUNDEBSimulation(municipioACRELANDIA, matriculasOriginaisCarregadasDoBanco);

console.log('\nResultados da simulação:');
console.log(`  Complementação VAAF: R$ ${resultado1.complementacaoVAAFSimulada.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`);
console.log(`  Complementação VAAT: R$ ${resultado1.complementacaoVAATSimulada.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`);
console.log(`  Complementação VAAR: R$ ${resultado1.complementacaoVAARSimulada.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`);
console.log(`  Total: R$ ${resultado1.repasseTotalSimulado.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`);

console.log('\nValores esperados (CSV):');
console.log(`  Complementação VAAF: R$ 0,00`);
console.log(`  Complementação VAAT: R$ 2.627.864,62`);
console.log(`  Complementação VAAR: R$ 0,00`);
console.log(`  Total: R$ 20.362.775,86`);

const diff1_vaat = Math.abs(resultado1.complementacaoVAATSimulada - 2627864.62);
const diff1_total = Math.abs(resultado1.repasseTotalSimulado - 20362775.86);

console.log('\nDiferenças:');
console.log(`  VAAT: R$ ${diff1_vaat.toFixed(2)} ${diff1_vaat < 0.01 ? '✓ OK' : '✗ ERRO'}`);
console.log(`  Total: R$ ${diff1_total.toFixed(2)} ${diff1_total < 0.01 ? '✓ OK' : '✗ ERRO'}`);

// Teste 2: Com aumento de 10% nas matrículas (distribuído entre as modalidades)
console.log('\n' + '─'.repeat(80));
console.log('TESTE 2: COM AUMENTO DE 10% NAS MATRÍCULAS');
console.log('─'.repeat(80));

// Simula que o usuário aumentou as matrículas em 10% distribuídas entre modalidades
const matriculasSimuladas: MatriculasAgregadas = {
  creche: 250,  // ~12% das matriculas totais simuladas
  preEscola: 530,  // ~23%
  anosIniciais: 1075,  // ~47%
  anosFinais: 140,  // ~6%
  ensinoMedio: 0,
  eja: 7,  // ~0.3%
  educacaoEspecial: 238,  // ~10%
  educacaoIndígenaQuilombola: 75  // ~3%
}; // Total: ~2315 (aproximadamente 10% a mais que 2101)

const resultado2 = runOfficialFUNDEBSimulation(municipioACRELANDIA, matriculasSimuladas);

console.log('\nResultados da simulação:');
console.log(`  Matrículas Ponderadas: ${resultado2.matriculasPonderadasReais.toFixed(2)} → ${resultado2.matriculasPonderadasSimuladas.toFixed(2)}`);
console.log(`  Aumento: ${((resultado2.matriculasPonderadasSimuladas / resultado2.matriculasPonderadasReais - 1) * 100).toFixed(2)}%`);
console.log(`\n  Complementação VAAF: R$ ${resultado2.complementacaoVAAFReal.toLocaleString('pt-BR', {minimumFractionDigits: 2})} → R$ ${resultado2.complementacaoVAAFSimulada.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`);
console.log(`  Complementação VAAT: R$ ${resultado2.complementacaoVAATReal.toLocaleString('pt-BR', {minimumFractionDigits: 2})} → R$ ${resultado2.complementacaoVAATSimulada.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`);
console.log(`  Complementação VAAR: R$ ${resultado2.complementacaoVAARReal.toLocaleString('pt-BR', {minimumFractionDigits: 2})} → R$ ${resultado2.complementacaoVAARSimulada.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`);
console.log(`\n  Repasse Total: R$ ${resultado2.repasseTotalReal.toLocaleString('pt-BR', {minimumFractionDigits: 2})} → R$ ${resultado2.repasseTotalSimulado.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`);
console.log(`  Diferença: R$ ${resultado2.diferencaAbsoluta.toLocaleString('pt-BR', {minimumFractionDigits: 2})} (${resultado2.diferencaPercentual >= 0 ? '+' : ''}${resultado2.diferencaPercentual.toFixed(2)}%)`);

console.log('\nValidação:');
// A complementação representa apenas ~13% do repasse total
// O restante é receita de contribuição que não muda
// Então 10% de aumento nas matrículas = 10% de aumento na complementação
// Mas isso representa apenas ~1.3% do total
const proporcaoComplementacao = resultado2.complementacaoVAATReal / resultado2.repasseTotalReal;
const aumentoEsperadoTotal = 0.10 * proporcaoComplementacao; // 10% da complementação sobre o total
const actual_increase = resultado2.diferencaPercentual / 100;
const diff_percentage = Math.abs(actual_increase - aumentoEsperadoTotal);

console.log(`  Proporção da complementação no total: ${(proporcaoComplementacao * 100).toFixed(2)}%`);
console.log(`  Aumento nas matrículas: 10%`);
console.log(`  Aumento na complementação: ${((resultado2.complementacaoVAATSimulada / resultado2.complementacaoVAATReal - 1) * 100).toFixed(2)}%`);
console.log(`  Aumento no repasse total: ${resultado2.diferencaPercentual.toFixed(2)}%`);
console.log(`  Esperado: ~${(aumentoEsperadoTotal * 100).toFixed(2)}% ${diff_percentage < 0.005 ? '✓ OK' : '✗ ATENÇÃO'}`);

console.log('\n' + '═'.repeat(80));
console.log('CONCLUSÃO\n');

const proporcaoComplementacaoFinal = resultado2.complementacaoVAATReal / resultado2.repasseTotalReal;
const aumentoEsperadoTotalFinal = 0.10 * proporcaoComplementacaoFinal;
const actual_increase_final = resultado2.diferencaPercentual / 100;
const diff_percentage_final = Math.abs(actual_increase_final - aumentoEsperadoTotalFinal);

if (diff1_total < 0.01 && diff_percentage_final < 0.005) {
  console.log('✓ SUCESSO: Implementação está correta!');
  console.log('  - Valores sem mudança de matrículas: idênticos ao CSV ✓');
  console.log('  - Ajuste proporcional funcionando corretamente ✓');
  console.log('\nCOMO FUNCIONA:');
  console.log('  1. Carrega valores REAIS do CSV (calculados pelo MEC/FNDE)');
  console.log('  2. Se matrículas vazias: retorna valores originais');
  console.log('  3. Se matrículas mudam: ajusta complementações proporcionalmente');
  console.log('  4. Receita de contribuição NÃO muda (apenas complementações)');
  console.log(`  5. Complementação = ${(proporcaoComplementacaoFinal * 100).toFixed(1)}% do total`);
  console.log(`     → 10% mais alunos = 10% mais complementação`);
  console.log(`     → Mas isso é apenas ${(aumentoEsperadoTotalFinal * 100).toFixed(2)}% do repasse total`);
} else {
  console.log('✗ ATENÇÃO: Implementação precisa de ajustes');
  if (diff1_total >= 0.01) {
    console.log(`  - Valores originais divergem em R$ ${diff1_total.toFixed(2)}`);
  }
  if (diff_percentage_final >= 0.005) {
    console.log(`  - Ajuste proporcional com diferença de ${(diff_percentage_final * 100).toFixed(2)}%`);
  }
}

console.log('\n');
