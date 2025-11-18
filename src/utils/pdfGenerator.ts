import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { IndicatorRow, RevenueRow, SimulationRow } from '../features/simulation/types';
import { formatCurrency, formatDateTime } from './formatters';

interface PDFData {
  simulationName: string;
  referencePeriod?: string;
  city?: string;
  state?: string;
  createdAt?: string;
  modifiedAt?: string;
  tableData: SimulationRow[];
  revenueData: RevenueRow[];
  indicatorsData: IndicatorRow[];
}

export const generateSimulationPDF = (data: PDFData): void => {
  const doc = new jsPDF();
  let yPosition = 20;

  // Título
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Relatório de Simulação FUNDEB', 105, yPosition, { align: 'center' });
  yPosition += 10;

  // Informações da Simulação
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Informações da Simulação', 14, yPosition);
  yPosition += 7;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Nome: ${data.simulationName}`, 14, yPosition);
  yPosition += 5;
  
  if (data.city && data.state) {
    doc.text(`Localidade: ${data.city} - ${data.state}`, 14, yPosition);
    yPosition += 5;
  }
  
  if (data.referencePeriod) {
    doc.text(`Período de Referência: ${data.referencePeriod}`, 14, yPosition);
    yPosition += 5;
  }
  
  if (data.createdAt) {
    doc.text(`Criado em: ${formatDateTime(data.createdAt)}`, 14, yPosition);
    yPosition += 5;
  }
  
  if (data.modifiedAt) {
    doc.text(`Modificado em: ${formatDateTime(data.modifiedAt)}`, 14, yPosition);
    yPosition += 5;
  }
  
  yPosition += 5;

  // Tabela de Matrículas
  if (data.tableData.length > 0) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Distribuição por Matrículas', 14, yPosition);
    yPosition += 5;

    autoTable(doc, {
      startY: yPosition,
      head: [['Categoria', 'Subcategoria', 'Matrículas', 'Repasse Original', 'Repasse Simulado', 'Diferença']],
      body: data.tableData.map(row => [
        row.category,
        row.subcategory,
        row.matriculas.toLocaleString('pt-BR'),
        formatCurrency(row.repasseOriginal),
        formatCurrency(row.repasseSimulado),
        formatCurrency(row.diferenca)
      ]),
      headStyles: { fillColor: [90, 105, 255], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { left: 14, right: 14 },
      styles: { fontSize: 8, cellPadding: 3 },
      columnStyles: {
        0: { cellWidth: 35 },
        1: { cellWidth: 35 },
        2: { halign: 'right', cellWidth: 25 },
        3: { halign: 'right', cellWidth: 30 },
        4: { halign: 'right', cellWidth: 30 },
        5: { halign: 'right', cellWidth: 25 }
      }
    });

    yPosition = (doc as any).lastAutoTable.finalY + 10;
  }

  // Nova página para tabela de receita se necessário
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }

  // Tabela de Receita
  if (data.revenueData.length > 0) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Distribuição por Receita', 14, yPosition);
    yPosition += 5;

    autoTable(doc, {
      startY: yPosition,
      head: [['Imposto', 'Valor Atual', 'Valor Simulado', 'Meta FUNDEB', 'Meta Rede', 'Diferença']],
      body: data.revenueData.map(row => [
        row.imposto,
        formatCurrency(row.valorAtual),
        formatCurrency(row.valorSimulado),
        formatCurrency(row.metaFundeb),
        formatCurrency(row.metaRede),
        formatCurrency(row.diferenca)
      ]),
      headStyles: { fillColor: [55, 196, 255], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { left: 14, right: 14 },
      styles: { fontSize: 8, cellPadding: 3 },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { halign: 'right', cellWidth: 30 },
        2: { halign: 'center', cellWidth: 25 },
        3: { halign: 'right', cellWidth: 30 },
        4: { halign: 'right', cellWidth: 30 },
        5: { halign: 'right', cellWidth: 30 }
      }
    });

    yPosition = (doc as any).lastAutoTable.finalY + 10;
  }

  // Nova página para indicadores se necessário
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 20;
  }

  // Tabela de Indicadores
  if (data.indicatorsData.length > 0) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Indicadores VAAR', 14, yPosition);
    yPosition += 5;

    autoTable(doc, {
      startY: yPosition,
      head: [['Indicador', 'Valor Atual', 'Meta FUNDEB', 'Meta Rede', 'Diferença']],
      body: data.indicatorsData.map(row => [
        row.indicador,
        formatCurrency(row.valorAtual),
        formatCurrency(row.metaFundeb),
        formatCurrency(row.metaRede),
        formatCurrency(row.diferenca)
      ]),
      headStyles: { fillColor: [255, 157, 88], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { left: 14, right: 14 },
      styles: { fontSize: 8, cellPadding: 3 },
      columnStyles: {
        0: { cellWidth: 60 },
        1: { halign: 'right', cellWidth: 30 },
        2: { halign: 'right', cellWidth: 30 },
        3: { halign: 'right', cellWidth: 30 },
        4: { halign: 'right', cellWidth: 30 }
      }
    });
  }

  // Rodapé com data de geração
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `Gerado em: ${formatDateTime(new Date().toISOString())} - Página ${i} de ${pageCount}`,
      105,
      285,
      { align: 'center' }
    );
  }

  // Download do PDF
  const fileName = `simulacao_${data.simulationName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};
