import { Button } from "../../../../../components/ui/button";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const PaginationControls = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: PaginationControlsProps): JSX.Element => (
  <div className="flex items-center justify-between py-4 px-6 border-t border-[#e9e9eb]">
    <span className="font-['Inter',Helvetica] font-normal text-[#535861] text-sm">
      {currentPage} de {totalPages}
    </span>
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={onPrevious}
        className="h-9 px-4 py-2 bg-white rounded-lg border border-[#d0d3d9] hover:bg-[#f5f5f6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span className="font-['Inter',Helvetica] font-medium text-[#414651] text-sm">
          Anterior
        </span>
      </Button>
      <Button
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={onNext}
        className="h-9 px-4 py-2 bg-white rounded-lg border border-[#d0d3d9] hover:bg-[#f5f5f6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span className="font-['Inter',Helvetica] font-medium text-[#414651] text-sm">
          Próxima
        </span>
      </Button>
    </div>
  </div>
);

