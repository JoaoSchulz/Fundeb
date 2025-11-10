import { Column } from "../../../components/common/DataTable";
import { SimulationRow } from "../types/simulation";

export const createTableColumns = (
  columns: Column<SimulationRow>[]
): Column<Record<string, unknown>>[] => {
  return columns.map((column) => ({
    ...column,
    render: column.render
      ? (row: Record<string, unknown>, index: number) => 
          column.render!(row as unknown as SimulationRow, index)
      : undefined,
  }));
};