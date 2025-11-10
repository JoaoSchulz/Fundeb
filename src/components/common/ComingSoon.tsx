import { Clock as ClockIcon } from "lucide-react";
import React from "react";

export const ComingSoon = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen w-full bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(239,246,255,1)_50%,rgba(236,238,243,1)_100%)] px-4 py-12">
      <div className="flex flex-col items-center gap-6 max-w-md text-center">
        <div className="w-24 h-24 rounded-full bg-sky-50 flex items-center justify-center">
          <ClockIcon className="w-12 h-12 text-[#22a3eb]" />
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="[font-family:'Inter',Helvetica] font-semibold text-[#181d27] text-3xl tracking-[0] leading-tight">
            Em Breve
          </h1>
          <p className="font-text-md-regular font-[number:var(--text-md-regular-font-weight)] text-[#535861] text-[length:var(--text-md-regular-font-size)] tracking-[var(--text-md-regular-letter-spacing)] leading-[var(--text-md-regular-line-height)] [font-style:var(--text-md-regular-font-style)]">
            Esta funcionalidade está sendo desenvolvida e estará disponível em breve.
          </p>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-[#22a3eb] animate-pulse" />
          <div
            className="w-2 h-2 rounded-full bg-[#22a3eb] animate-pulse"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="w-2 h-2 rounded-full bg-[#22a3eb] animate-pulse"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>
    </section>
  );
};
