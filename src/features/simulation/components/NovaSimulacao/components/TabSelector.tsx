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
      onClick={() => onTabChange("enrollment")}
      className={`px-4 py-2 rounded-lg font-['Inter',Helvetica] font-medium text-sm transition-colors ${
        activeTab === "enrollment"
          ? "bg-[#eff8ff] text-[#22a3eb] border border-[#22a3eb]"
          : "bg-white text-[#535861] border border-[#d0d3d9] hover:bg-[#f5f5f6]"
      }`}
    >
      Por Matrículas
    </button>
    <button
      onClick={() => onTabChange("revenue")}
      className={`px-4 py-2 rounded-lg font-['Inter',Helvetica] font-medium text-sm transition-colors ${
        activeTab === "revenue"
          ? "bg-[#eff8ff] text-[#22a3eb] border border-[#22a3eb]"
          : "bg-white text-[#535861] border border-[#d0d3d9] hover:bg-[#f5f5f6]"
      }`}
    >
      Por Receita
    </button>
  </div>
);

