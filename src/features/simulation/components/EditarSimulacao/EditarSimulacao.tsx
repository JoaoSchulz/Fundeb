import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  SimulationHeader,
  SimulationFormFields,
  TabSelector,
  EnrollmentForm,
  RevenueForm,
  FormActions,
} from "./components";
import { useEnrollmentForm, useRevenueForm } from "../NovaSimulacao/hooks";
import type { TabType } from "../NovaSimulacao/types/simulationForm";

export const EditarSimulacao = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("enrollment");
  const [simulationName, setSimulationName] = useState("Simulação 05/05/2025");
  const [baseYear, setBaseYear] = useState("2027");

  const { categories, handleChange: handleEnrollmentChange } =
    useEnrollmentForm();
  const { items, handleChange: handleRevenueChange } = useRevenueForm();

  useEffect(() => {
    // TODO: Buscar dados da simulação pelo ID quando back-end estiver pronto
    // const simulation = await SimulationService.getById(id);
    // setSimulationName(simulation.name);
    // setBaseYear(simulation.baseYear);
    // etc...
  }, [id]);

  const handleSave = (): void => {
    toast.success("Simulação atualizada com sucesso!");
    setTimeout(() => {
      navigate("/app/simulacoes");
    }, 1000);
  };

  const handleCancel = (): void => {
    navigate("/app/simulacoes");
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
            />

            <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === "enrollment" ? (
              <EnrollmentForm
                categories={categories}
                onEnrollmentChange={handleEnrollmentChange}
              />
            ) : (
              <RevenueForm
                items={items}
                onRevenueChange={handleRevenueChange}
              />
            )}

            <FormActions onCancel={handleCancel} onSave={handleSave} />
          </div>
        </div>
      </div>
    </section>
  );
};

