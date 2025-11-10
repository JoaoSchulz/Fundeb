import React from "react";
import { LAYOUT_CONSTANTS } from "../../utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export const PageHeader = ({
  title,
  description,
  actions,
}: PageHeaderProps): JSX.Element => {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 ${LAYOUT_CONSTANTS.SPACING.PAGE_HORIZONTAL} ${LAYOUT_CONSTANTS.SPACING.PAGE_VERTICAL}`}
    >
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <h1 className="[font-family:'Inter',Helvetica] font-semibold text-[#181d27] text-2xl tracking-[0] leading-normal truncate">
          {title}
        </h1>
        {description && (
          <p className="font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-[#535861] text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)]">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
          {actions}
        </div>
      )}
    </div>
  );
};
