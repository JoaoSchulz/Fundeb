import React, { useState } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export const Tooltip = ({ content, children }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY - 10,
        left: rect.left + window.scrollX + rect.width / 2,
      });
      setIsVisible(true);
    }
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help inline-block"
      >
        {children}
      </div>
      {isVisible &&
        createPortal(
          <div
            className="fixed z-[9999] px-4 py-3 bg-[#1a1d24] text-white text-sm rounded-lg shadow-lg max-w-[280px] w-max pointer-events-none"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="font-['Inter',Helvetica] font-normal leading-5 whitespace-pre-line">
              {content}
            </div>
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2"
              style={{ width: 0, height: 0 }}
            >
              <div className="border-8 border-transparent border-t-[#1a1d24]" />
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
