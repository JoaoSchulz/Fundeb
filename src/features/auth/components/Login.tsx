import { Eye as Eye, EyeOff as EyeOffIcon, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useAuth } from "../hooks";
import { LAYOUT_CONSTANTS } from "../../../utils/constants";

export const Login = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const { login, isLoading } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, senha);
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
                Bem-vindo ao Sistema FUNDEB
              </h1>
              <p className="font-['Inter',Helvetica] font-normal text-[#535861] text-sm tracking-[0] leading-[20px] text-center">
                Faça login para acessar o painel de simulações
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Input
              id="email"
              type="text"
              placeholder="Digite seu e-mail ou usuário"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="lg"
              required
            />
            <div className="relative">
              <Input
                id="senha"
                type={showSenha ? "text" : "password"}
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="pr-10"
                size="lg"
                required
              />
              <button
                type="button"
                onClick={() => setShowSenha(!showSenha)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#535861] hover:text-[#22a3eb] transition-colors"
                tabIndex={-1}
              >
                {showSenha ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className={LAYOUT_CONSTANTS.BUTTON.PRIMARY_FULL_WIDTH}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </Button>

          <div className="flex justify-center">
            <Link
              to="/esqueci-senha"
              className="font-text-sm-medium font-[number:var(--text-sm-medium-font-weight)] text-[#22a3eb] text-[length:var(--text-sm-medium-font-size)] tracking-[var(--text-sm-medium-letter-spacing)] leading-[var(--text-sm-medium-line-height)] [font-style:var(--text-sm-medium-font-style)] hover:underline"
            >
              Esqueci minha senha
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};
