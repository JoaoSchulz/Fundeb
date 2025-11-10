import { TrendingUp } from "lucide-react";
import { Card, CardContent } from "../../../../../../../components/ui/card";
import { useHideValues } from "../../../../../../../hooks/useHideValues";
import type { StatsCard } from "../../../../../types";

interface StatsCardsProps {
  cards: StatsCard[];
}

export const StatsCards = ({ cards }: StatsCardsProps): JSX.Element => {
  const { hideValues } = useHideValues();
  
  return (
    <div className="flex lg:flex-wrap gap-2 w-full px-4 md:px-6 lg:px-8 pb-2 lg:pb-0">
      {cards.map((card, index) => (
        <Card
          key={index}
          className={`flex-col min-w-[280px] w-full md:min-w-[280px] lg:min-w-[320px] p-6 flex-1 rounded-xl border border-solid border-[#e9e9eb] shadow-shadows-shadow-xs ${card.gradient} hover:shadow-lg transition-shadow duration-200`}
        >
          <CardContent className="flex flex-col items-start justify-between w-full p-0 min-h-[90px]">
            <p className="w-full font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-white text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)]">
              {card.title}
            </p>
            <h2 className={`font-semibold text-white ${hideValues ? 'select-none blur-sm' : ''}`} style={{ fontSize: '24px', lineHeight: '30px', letterSpacing: '0px' }}>
              {card.value}
            </h2>
            <div className="inline-flex items-center gap-2">
              <div className="inline-flex items-center justify-center gap-1">
                <TrendingUp className="w-4 h-4 text-white" />
                <span className={`font-text-sm-medium font-[number:var(--text-sm-medium-font-weight)] text-white text-[length:var(--text-sm-medium-font-size)] text-center tracking-[var(--text-sm-medium-letter-spacing)] leading-[var(--text-sm-medium-line-height)] [font-style:var(--text-sm-medium-font-style)] ${hideValues ? 'select-none blur-sm' : ''}`}>
                  {card.trend}
                </span>
              </div>
              <span className="font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-white text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)]">
                {card.trendLabel}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

