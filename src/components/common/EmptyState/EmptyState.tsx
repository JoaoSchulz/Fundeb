import { LucideIcon } from "lucide-react";
import { Button } from "../../ui/button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

/**
 * Componente reutilizável para estados vazios
 * 
 * Aguardando backend: Este componente será usado quando os dados virem da API
 * 
 * @example
 * <EmptyState
 *   icon={FileX}
 *   title="Nenhuma simulação encontrada"
 *   description="Crie sua primeira simulação para começar"
 *   actionLabel="Nova Simulação"
 *   onAction={() => navigate('/app/nova-simulacao')}
 * />
 */
export const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className = "",
}: EmptyStateProps): JSX.Element => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}
    >
      <div className="w-16 h-16 rounded-full bg-[#eff8ff] flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-[#22a3eb]" />
      </div>
      <h3 className="text-lg font-semibold text-[#181d27] mb-2">{title}</h3>
      <p className="text-sm text-[#535861] max-w-md mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="bg-[#22a3eb] hover:bg-[#1d8bc7] text-white h-10 px-6"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

