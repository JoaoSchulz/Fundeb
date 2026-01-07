import { Button } from "../../../../../../../components/ui/button";
import type { Tab } from "../../../../../types";

interface SimulationTableTabsProps {
  tabs: Tab[];
  onTabChange: (tabId: string) => void;
  isLoading: boolean;
}

export const SimulationTableTabs = ({
  tabs,
  onTabChange,
  isLoading,
}: SimulationTableTabsProps): JSX.Element => (
  <div className="flex overflow-x-auto lg:flex-wrap items-start gap-2 w-full lg:w-auto pb-2 lg:pb-0 scrollbar-modern-horizontal">
    {tabs.map((tab) => (
      <Button
        key={tab.id}
        variant={tab.active ? "default" : "outline"}
        onClick={() => onTabChange(tab.id)}
        disabled={true}
        className={`h-auto items-center justify-center gap-1 px-3.5 py-2.5 rounded-lg border border-solid transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
          tab.active
            ? "bg-sky-50 border-[#0ba4eb]"
            : "bg-white border-[#d5d6d9]"
        } cursor-default opacity-100`}
      >
        <span
          className={`font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)] ${
            tab.active ? "text-[#0ba4eb]" : "text-[#414651]"
          }`}
        >
          {tab.label}
        </span>
      </Button>
    ))}
  </div>
);

