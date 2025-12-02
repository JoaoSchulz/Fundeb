/**
 * Utility functions for simulation data processing
 */

/**
 * Normaliza a data de criação de diferentes formatos para ISO string
 */
export function normalizeCreatedAt(rawDate: any): string {
  if (typeof rawDate === 'string' && rawDate.includes('T')) {
    return rawDate;
  }
  
  const dateStr = String(rawDate);
  const parts = dateStr.split("/");
  
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return `${year}-${month}-${day}T10:30:00`;
  }
  
  return new Date().toISOString();
}

/**
 * Calcula o período de referência baseado no ano base
 * Formato: "09/12/ANOBASE a 09/12/ANOBASE+2"
 */
export function calculateReferencePeriod(anoBase: number | undefined | null): string {
  const DEFAULT_PERIOD = "09/12/2024 a 09/12/2026";
  
  if (!anoBase || typeof anoBase !== 'number') {
    return DEFAULT_PERIOD;
  }
  
  const startDate = new Date(anoBase, 11, 9); // 09/12/anoBase
  const endDate = new Date(anoBase + 2, 11, 9); // 09/12/anoBase+2
  
  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  return `${formatDate(startDate)} a ${formatDate(endDate)}`;
}

/**
 * Extrai UF e município com ordem de prioridade consistente
 */
export function extractLocationData(simulation: any): { uf: string | null; municipio: string | null } {
  const dadosEntrada = simulation?.dadosEntrada;
  
  return {
    uf: dadosEntrada?.uf || simulation?.state || null,
    municipio: dadosEntrada?.municipio || simulation?.city || null,
  };
}
