import { CheckCircle2, Mail } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { LAYOUT_CONSTANTS } from "../../../utils/constants";

export const ForgotPasswordSuccess = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email] = useState<string>(location.state?.email || "");

  return (
    <section className="flex flex-col items-center justify-center min-h-screen w-full bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(239,246,255,1)_50%,rgba(236,238,243,1)_100%)] px-4 py-12">
      <div className="flex flex-col items-center gap-8 max-w-md w-full">
        <div className="flex flex-col gap-6 w-full bg-white rounded-lg shadow-lg p-8 border border-[#e9e9eb] animate-fade-up">
          <div className="flex flex-col items-center gap-6">
            <img
              className="w-[210px] h-auto object-contain animate-fade-in"
              alt="Logo FUNDEB"
              src="/logo-fundeb.png"
            />
            <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="w-20 h-20 rounded-full bg-sky-50 flex items-center justify-center shadow-lg animate-[scale-in_0.6s_ease-out_0.3s_both]">
                <CheckCircle2 className="w-12 h-12 text-[#22a3eb]" />
              </div>
              <div className="absolute inset-0 rounded-full bg-[#22a3eb] opacity-20 animate-ping" style={{ animationDelay: "0.5s" }} />
            </div>

            <div className="flex flex-col items-center gap-2 text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <h1 className="[font-family:'Inter',Helvetica] font-semibold text-[#181d27] text-2xl tracking-[0] leading-tight">
                E-mail enviado com sucesso!
              </h1>
              <p className="font-['Inter',Helvetica] font-normal text-[#535861] text-sm tracking-[0] leading-[20px] max-w-sm">
                Enviamos as instruções de recuperação de senha para{" "}
                {email && (
                  <span className="font-medium text-[#22a3eb]">{email}</span>
                )}
                {!email && "seu e-mail"}
                . Verifique sua caixa de entrada e siga as instruções.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-4 border-t border-[#e9e9eb] animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="flex items-start gap-3 p-4 bg-sky-50 rounded-lg border border-[#22a3eb]/20">
              <Mail className="w-5 h-5 text-[#22a3eb] mt-0.5 shrink-0" />
              <div className="flex flex-col gap-1">
                <p className="font-['Inter',Helvetica] font-medium text-[#181d27] text-sm">
                  Não recebeu o e-mail?
                </p>
                <p className="font-['Inter',Helvetica] font-normal text-[#535861] text-xs">
                  Verifique sua pasta de spam ou tente novamente em alguns minutos.
                </p>
              </div>
            </div>

            <Button
              onClick={() => navigate("/login")}
              className={LAYOUT_CONSTANTS.BUTTON.PRIMARY_FULL_WIDTH}
            >
              Voltar para o login
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

