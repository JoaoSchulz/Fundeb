import { Dialog, DialogContent } from "../../../../../../components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "../../../../../../components/ui/button";
import { formatCurrency } from "../../../../../../utils/formatters";
import { useHideValues } from "../../../../../../hooks/useHideValues";
import type { SimulationRow } from "../../../../types/simulation";

interface CategoryDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: SimulationRow | null;
}

export const CategoryDetailsModal = ({
  open,
  onOpenChange,
  category,
}: CategoryDetailsModalProps): JSX.Element => {
  const { hideValues } = useHideValues();

  if (!category) return <></>;

  const maskValue = (value: string) => (hideValues ? "R$ •••••" : value);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[700px] max-h-[90vh] p-0 overflow-hidden [&>button]:hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-[#e9e9eb] flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#eff6ff]">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#181d27]">
                  Detalhes da Categoria
                </h2>
                <p className="text-sm text-[#535861]">{category.category}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 text-[#535861] hover:text-[#181d27] hover:bg-neutral-100"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="flex flex-col gap-6">
              {/* Informações */}
              <div className="flex flex-col gap-4">
                <h3 className="text-base font-semibold text-[#181d27]">
                  Informações da Categoria
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2 p-4 rounded-xl bg-neutral-50">
                    <span className="text-sm text-[#535861]">Categoria</span>
                    <span className="text-base font-semibold text-[#181d27]">
                      {category.category}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 p-4 rounded-xl bg-neutral-50">
                    <span className="text-sm text-[#535861]">Subcategoria</span>
                    <span className="text-base font-semibold text-[#181d27]">
                      {category.subcategory}
                    </span>
                  </div>
                </div>
              </div>

              {/* Estatísticas */}
              <div className="flex flex-col gap-4">
                <h3 className="text-base font-semibold text-[#181d27]">
                  Estatísticas
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-col gap-2 p-4 rounded-xl bg-neutral-50">
                    <span className="text-sm text-[#535861]">Matrículas</span>
                    <span className="text-2xl font-semibold text-[#181d27]">
                      {hideValues ? "•••" : category.matriculas.toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Dados Financeiros */}
              <div className="flex flex-col gap-4">
                <h3 className="text-base font-semibold text-[#181d27]">
                  Dados Financeiros
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2 p-4 rounded-xl bg-neutral-50">
                    <span className="text-sm text-[#535861]">Original</span>
                    <span className="text-lg font-semibold text-[#181d27]">
                      {maskValue(formatCurrency(category.repasseOriginal))}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 p-4 rounded-xl bg-[#eff6ff]">
                    <span className="text-sm text-[#535861]">Simulado</span>
                    <span className="text-lg font-semibold text-[#22a3eb]">
                      {maskValue(formatCurrency(category.repasseSimulado))}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 p-4 rounded-xl bg-[#f0fdf4]">
                    <span className="text-sm text-[#535861]">Ganho</span>
                    <span className={`text-lg font-semibold ${category.diferencaColor}`}>
                      {maskValue(formatCurrency(category.diferenca))}
                    </span>
                  </div>
                </div>
              </div>

              {/* Análise */}
              <div className="flex flex-col gap-4">
                <h3 className="text-base font-semibold text-[#181d27]">
                  Análise
                </h3>
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <p className="text-sm text-[#414651]">
                    {category.diferenca > 0
                      ? `Esta categoria apresenta um ganho potencial de ${maskValue(
                          formatCurrency(category.diferenca)
                        )} com a simulação realizada.`
                      : category.diferenca < 0
                      ? `Esta categoria apresenta uma redução de ${maskValue(
                          formatCurrency(Math.abs(category.diferenca))
                        )} com a simulação realizada.`
                      : "Esta categoria mantém os mesmos valores na simulação."}
                  </p>
                  {category.matriculas > 0 && (
                    <p className="text-sm text-[#414651] mt-2">
                      Valor por matrícula: {maskValue(
                        formatCurrency(category.repasseSimulado / category.matriculas)
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
