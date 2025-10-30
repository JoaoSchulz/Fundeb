import { Eye, MapPin, Plus } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../../../components/ui/button";
import { useSimulation } from "../../hooks";

const mockSimulations = [
  {
    id: 1,
    name: "Simulação de exemplo 01",
    createdAt: "22/03/2025",
    modifiedAt: "22/03/2025",
  },
  {
    id: 2,
    name: "Simulação de exemplo 01",
    createdAt: "22/03/2025",
    modifiedAt: "22/03/2025",
  },
  {
    id: 3,
    name: "Simulação de exemplo 06",
    createdAt: "22/03/2025",
    modifiedAt: "22/03/2025",
  },
  {
    id: 4,
    name: "Simulação de exemplo 05",
    createdAt: "22/03/2025",
    modifiedAt: "22/03/2025",
  },
  {
    id: 5,
    name: "Simulação de exemplo 03",
    createdAt: "22/03/2025",
    modifiedAt: "22/03/2025",
  },
  {
    id: 6,
    name: "Simulação de exemplo 02",
    createdAt: "22/03/2025",
    modifiedAt: "22/03/2025",
  },
  {
    id: 7,
    name: "Simulação de exemplo 02",
    createdAt: "22/03/2025",
    modifiedAt: "22/03/2025",
  },
  {
    id: 8,
    name: "Simulação de exemplo 02",
    createdAt: "22/03/2025",
    modifiedAt: "22/03/2025",
  },
  {
    id: 9,
    name: "Simulação de exemplo 02",
    createdAt: "22/03/2025",
    modifiedAt: "22/03/2025",
  },
];

export const MinhasSimulacoes = (): JSX.Element => {
  const navigate = useNavigate();
  const { setSelectedSimulation } = useSimulation();
  const [simulations, setSimulations] = useState(mockSimulations);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handleViewSimulation = (simulation: typeof mockSimulations[0]) => {
    setSelectedSimulation(simulation);
    toast.success("Simulação atualizada", {
      description: `Visualizando: ${simulation.name}`,
    });
    navigate("/");
  };

  return (
    <section className="flex flex-col items-start gap-8 pt-8 pb-12 px-0 w-full bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(239,246,255,1)_50%,rgba(236,238,243,1)_100%)] min-h-screen">
      <div className="flex flex-col items-start gap-6 w-full px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 w-full max-w-[1400px] mx-auto">
          <div className="flex flex-col gap-1">
            <h1 className="font-['Inter',Helvetica] font-semibold text-[#181d27] text-2xl tracking-[0] leading-[32px] flex items-center gap-2">
              Olá, João
              <span className="text-2xl">👋</span>
            </h1>
            <p className="font-['Inter',Helvetica] font-normal text-[#535861] text-sm tracking-[0] leading-[20px]">
              Última atualização dos dados: Abril/2025 com base no Censo Escolar
              2023 e projeções do FNDE
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button
              variant="outline"
              className="h-11 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white rounded-lg border border-solid border-[#d0d3d9] hover:bg-[#f5f5f6] transition-colors"
            >
              <MapPin className="w-5 h-5 text-[#414651]" />
              <span className="font-['Inter',Helvetica] font-medium text-[#181d27] text-sm">
                SP
              </span>
              <span className="text-[#d0d3d9]">|</span>
              <span className="font-['Inter',Helvetica] font-medium text-[#181d27] text-sm">
                Campinas
              </span>
            </Button>

            <Button
              onClick={() => navigate("/nova-simulacao")}
              className="h-11 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#22a3eb] hover:bg-[#1a8acc] rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5 text-white" />
              <span className="font-['Inter',Helvetica] font-semibold text-white text-sm">
                Nova Simulação
              </span>
            </Button>
          </div>
        </div>

        <div className="w-full max-w-[1400px] mx-auto bg-white rounded-xl border border-solid border-[#e9e9eb] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#e9e9eb]">
            <h2 className="font-['Inter',Helvetica] font-semibold text-[#181d27] text-lg tracking-[0] leading-[28px]">
              Minhas Simulações
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e9e9eb]">
                  <th className="text-left py-3 px-6 font-['Inter',Helvetica] font-medium text-[#535861] text-sm">
                    Nome da Simulação
                  </th>
                  <th className="text-left py-3 px-6 font-['Inter',Helvetica] font-medium text-[#535861] text-sm">
                    Criado em
                  </th>
                  <th className="text-left py-3 px-6 font-['Inter',Helvetica] font-medium text-[#535861] text-sm">
                    Modificado em
                  </th>
                  <th className="w-16"></th>
                </tr>
              </thead>
              <tbody>
                {simulations.map((simulation, index) => (
                  <tr
                    key={simulation.id}
                    className={`border-b border-[#e9e9eb] hover:bg-[#f9fafb] transition-colors ${
                      index === simulations.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="py-4 px-6">
                      <span className="font-['Inter',Helvetica] font-normal text-[#181d27] text-sm">
                        {simulation.name}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-['Inter',Helvetica] font-normal text-[#535861] text-sm">
                        {simulation.createdAt}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-['Inter',Helvetica] font-normal text-[#535861] text-sm">
                        {simulation.modifiedAt}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-md hover:bg-[#f5f5f6] transition-colors"
                        onClick={() => handleViewSimulation(simulation)}
                      >
                        <Eye className="w-5 h-5 text-[#858d9d]" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between py-4 px-6 border-t border-[#e9e9eb]">
            <span className="font-['Inter',Helvetica] font-normal text-[#535861] text-sm">
              1 de {totalPages}
            </span>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                className="h-9 px-4 py-2 bg-white rounded-lg border border-[#d0d3d9] hover:bg-[#f5f5f6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span className="font-['Inter',Helvetica] font-medium text-[#414651] text-sm">
                  Anterior
                </span>
              </Button>

              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                className="h-9 px-4 py-2 bg-white rounded-lg border border-[#d0d3d9] hover:bg-[#f5f5f6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span className="font-['Inter',Helvetica] font-medium text-[#414651] text-sm">
                  Próxima
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
