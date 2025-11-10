import { HelpCircle, Eye } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Tooltip } from "../ui/tooltip";

export type Column<T = unknown> = {
  key: string;
  label: string;
  tooltip?: string;
  render?: (row: T, index: number) => React.ReactNode;
  className?: string;
  headerClassName?: string;
  width?: string;
};

export type DataTableProps<T = unknown> = {
  data: T[];
  columns: Column<T>[];
  onRowAction?: (row: T, index: number) => void;
  shouldShowAction?: (row: T, index: number) => boolean;
  actionLabel?: string;
  renderTotalRow?: () => React.ReactNode;
  getRowClassName?: (row: T, index: number) => string;
  emptyMessage?: string;
};

export const DataTable = <T extends Record<string, unknown>>({
  data,
  columns,
  onRowAction,
  shouldShowAction,
  actionLabel = "Visualizar",
  renderTotalRow,
  getRowClassName,
  emptyMessage = "Nenhum dado disponível",
}: DataTableProps<T>): JSX.Element => {
  return (
    <div className="w-full overflow-x-auto scrollbar-modern-horizontal">
      <table className="w-full min-w-[800px] border-collapse">
        <thead>
          <tr className="border-b border-solid border-[#e9e9eb]">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`text-left px-4 py-3 md:px-6 md:py-4 bg-neutral-50 ${column.headerClassName ?? ""}`}
                style={column.width ? { width: column.width } : undefined}
              >
                <div className="flex items-center gap-2">
                  <span className="font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[#535861] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]">
                    {column.label}
                  </span>
                  {column.tooltip && (
                    <Tooltip content={column.tooltip}>
                      <HelpCircle className="w-4 h-4 text-[#717680]" />
                    </Tooltip>
                  )}
                </div>
              </th>
            ))}
            {onRowAction && (
              <th className="w-16 px-4 py-3 md:px-6 md:py-4 bg-neutral-50" aria-label="Ações"></th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (onRowAction ? 1 : 0)}
                className="px-4 py-12 md:px-6 text-center"
              >
                <span className="font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#535861] text-[length:var(--text-sm-regular-font-size)]">
                  {emptyMessage}
                </span>
              </td>
            </tr>
          ) : (
            <>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b border-solid border-[#e9e9eb] hover:bg-neutral-50 transition-colors duration-150 ${
                    getRowClassName ? getRowClassName(row, index) : ""
                  }`}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`px-4 py-3 md:px-6 md:py-4 ${column.className ?? ""}`}
                    >
                      {column.render
                        ? column.render(row, index)
                        : String(row[column.key] ?? "")}
                    </td>
                  ))}
                  {onRowAction &&
                    (!shouldShowAction || shouldShowAction(row, index)) && (
                      <td className="px-4 py-3 md:px-6 md:py-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-[#414651] hover:text-[#22a3eb] hover:bg-sky-50 transition-all duration-200"
                          onClick={() => onRowAction(row, index)}
                          aria-label={actionLabel}
                        >
                          <Eye className="w-5 h-5" />
                        </Button>
                      </td>
                    )}
                  {onRowAction &&
                    shouldShowAction &&
                    !shouldShowAction(row, index) && (
                      <td className="px-4 py-3 md:px-6 md:py-4"></td>
                    )}
                </tr>
              ))}
              {renderTotalRow && (
                <tr className="bg-neutral-100 font-semibold border-b border-solid border-[#e9e9eb]">
                  <td colSpan={columns.length + (onRowAction ? 1 : 0)} className="px-4 py-3 md:px-6 md:py-4">
                    {renderTotalRow()}
                  </td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

