type TabType = "enrollment" | "revenue";

interface TabSelectorProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const TabSelector = ({
  activeTab,
  onTabChange,
}: TabSelectorProps): JSX.Element => (
  <div className="flex gap-2 mb-6">
    <button
      className="px-4 py-2 rounded-lg font-['Inter',Helvetica] font-medium text-sm bg-[#eff8ff] text-[#22a3eb] border border-[#22a3eb]"
      disabled
    >
      Por Matrículas
    </button>
  </div>
);

