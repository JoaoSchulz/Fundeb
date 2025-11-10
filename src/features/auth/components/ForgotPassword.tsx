import { Mail } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { LAYOUT_CONSTANTS } from "../../../utils/constants";

export const ForgotPassword = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error("Por favor, informe seu e-mail");
      return;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Por favor, informe um e-mail válido");
      return;
    }

    setIsLoading(true);
    
    // Simular chamada à API
    setTimeout(() => {
      setIsLoading(false);
      navigate("/esqueci-senha/sucesso", { state: { email } });
    }, 1000);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen w-full bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(239,246,255,1)_50%,rgba(236,238,243,1)_100%)] px-4 py-12">
      <div className="flex flex-col items-center gap-8 max-w-md w-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 w-full bg-white rounded-lg shadow-lg p-8 border border-[#e9e9eb]"
        >
          <div className="flex flex-col items-center gap-4">
            <img
              className="w-[210px] h-auto object-contain"
              alt="Logo FUNDEB"
              src="/logo-fundeb.png"
            />
            <div className="flex flex-col items-center gap-2">
              <h1 className="[font-family:'Inter',Helvetica] font-semibold text-[#181d27] text-2xl tracking-[0] leading-tight text-center">
                Recuperar senha
              </h1>
              <p className="font-['Inter',Helvetica] font-normal text-[#535861] text-sm tracking-[0] leading-[20px] text-center">
                Digite seu e-mail para receber as instruções de recuperação de senha
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={Mail}
              size="md"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className={LAYOUT_CONSTANTS.BUTTON.PRIMARY_FULL_WIDTH}
          >
            {isLoading ? "Enviando..." : "Enviar instruções"}
          </Button>

          <div className="flex justify-center">
            <Link
              to="/login"
              className="font-text-sm-medium font-[number:var(--text-sm-medium-font-weight)] text-[#22a3eb] text-[length:var(--text-sm-medium-font-size)] tracking-[var(--text-sm-medium-letter-spacing)] leading-[var(--text-sm-medium-line-height)] [font-style:var(--text-sm-medium-font-style)] hover:underline"
            >
              Voltar para o login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};
