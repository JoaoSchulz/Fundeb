import { KeyRound as KeyRoundIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";

export const ForgotPassword = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen w-full bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(239,246,255,1)_50%,rgba(236,238,243,1)_100%)] px-4 py-12">
      <div className="flex flex-col items-center gap-6 max-w-md text-center">
        <div className="w-24 h-24 rounded-full bg-sky-50 flex items-center justify-center">
          <KeyRoundIcon className="w-12 h-12 text-[#22a3eb]" />
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="[font-family:'Inter',Helvetica] font-semibold text-[#181d27] text-3xl tracking-[0] leading-tight">
            Em Breve
          </h1>
          <p className="font-text-md-regular font-[number:var(--text-md-regular-font-weight)] text-[#535861] text-[length:var(--text-md-regular-font-size)] tracking-[var(--text-md-regular-letter-spacing)] leading-[var(--text-md-regular-line-height)] [font-style:var(--text-md-regular-font-style)]">
            A funcionalidade de recuperação de senha está sendo desenvolvida e
            estará disponível em breve.
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

        <Link to="/login" className="mt-4">
          <Button
            variant="outline"
            className="h-10 px-6 border-[#22a3eb] text-[#22a3eb] hover:bg-[#22a3eb] hover:text-white transition-all duration-200"
          >
            Voltar para o Login
          </Button>
        </Link>
      </div>
    </section>
  );
};
