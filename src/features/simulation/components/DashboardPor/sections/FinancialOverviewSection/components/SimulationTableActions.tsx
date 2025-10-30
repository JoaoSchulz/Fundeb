import { Download, Edit, Filter } from "lucide-react";
import { Button } from "../../../../../../../components/ui/button";

export const SimulationTableActions = (): JSX.Element => (
  <div className="flex flex-wrap items-center justify-start lg:justify-end gap-3 md:gap-4 w-full lg:w-auto">
    <Button
      variant="ghost"
      className="h-auto items-center justify-center gap-1 px-0 py-2.5 bg-white rounded-lg hover:bg-neutral-50 transition-colors duration-200"
    >
      <Download className="w-5 h-5 text-[#414651]" />
      <span className="font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[#414651] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]">
        Baixar
      </span>
    </Button>
    <img className="w-px h-3 object-cover" alt="Line" src="/line-1.svg" />
    <Button
      variant="ghost"
      className="h-auto items-center justify-center gap-1 px-0 py-2.5 bg-white rounded-lg hover:bg-neutral-50 transition-colors duration-200"
    >
      <Edit className="w-5 h-5 text-[#414651]" />
      <span className="font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[#414651] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]">
        Editar
      </span>
    </Button>
    <img className="w-px h-3 object-cover" alt="Line" src="/line-1.svg" />
    <Button
      variant="ghost"
      className="h-auto items-center justify-center gap-1 px-0 py-2.5 bg-white rounded-lg hover:bg-neutral-50 transition-colors duration-200"
    >
      <Filter className="w-5 h-5 text-[#414651]" />
      <span className="font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[#414651] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]">
        Filtrar
      </span>
    </Button>
  </div>
);

