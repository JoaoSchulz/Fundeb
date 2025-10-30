import { TrendingUp } from "lucide-react";
import { Card, CardContent } from "../../../../../../../components/ui/card";
import type { StatsCard } from "../../../../../../types";

interface StatsCardsProps {
  cards: StatsCard[];
}

export const StatsCards = ({ cards }: StatsCardsProps): JSX.Element => (
  <div className="flex lg:flex-wrap gap-4 md:gap-6 w-full px-4 md:px-6 lg:px-8 pb-2 lg:pb-0">
    {cards.map((card, index) => (
      <Card
        key={index}
        className={`flex-col min-w-[280px] w-full md:min-w-[280px] lg:min-w-[320px] p-6 flex-1 rounded-xl border border-solid border-[#e9e9eb] shadow-shadows-shadow-xs ${card.gradient} hover:shadow-lg transition-shadow duration-200`}
      >
        <CardContent className="flex flex-col items-start gap-3 w-full p-0 min-h-[100px]">
          <p className="w-full font-text-sm-medium font-[number:var(--text-sm-medium-font-weight)] text-white text-[length:var(--text-sm-medium-font-size)] tracking-[var(--text-sm-medium-letter-spacing)] leading-[var(--text-sm-medium-line-height)] [font-style:var(--text-sm-medium-font-style)] min-h-[40px]">
            {card.title}
          </p>
          <div className="flex flex-wrap items-baseline gap-[12px_12px] w-full">
            <h2 className="font-display-sm-semibold font-[number:var(--display-sm-semibold-font-weight)] text-white text-[length:var(--display-sm-semibold-font-size)] tracking-[var(--display-sm-semibold-letter-spacing)] leading-[var(--display-sm-semibold-line-height)] [font-style:var(--display-sm-semibold-font-style)]">
              {card.value}
            </h2>
            <div className="inline-flex items-center gap-2">
              <div className="inline-flex items-center justify-center gap-1">
                <TrendingUp className="w-4 h-4 text-white" />
                <span className="font-text-sm-medium font-[number:var(--text-sm-medium-font-weight)] text-white text-[length:var(--text-sm-medium-font-size)] text-center tracking-[var(--text-sm-medium-letter-spacing)] leading-[var(--text-sm-medium-line-height)] [font-style:var(--text-sm-medium-font-style)]">
                  {card.trend}
                </span>
              </div>
              <span className="font-text-sm-medium font-[number:var(--text-sm-medium-font-weight)] text-white text-[length:var(--text-sm-medium-font-size)] tracking-[var(--text-sm-medium-letter-spacing)] leading-[var(--text-sm-medium-line-height)] [font-style:var(--text-sm-medium-font-style)]">
                {card.trendLabel}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

