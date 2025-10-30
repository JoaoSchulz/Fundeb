import { Eye as Eye, EyeOff as EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useAuth } from "../hooks";

export const Login = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen w-full bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(239,246,255,1)_50%,rgba(236,238,243,1)_100%)] px-4 py-12">
      <div className="flex flex-col items-center gap-8 max-w-md w-full">
        <div className="flex flex-col items-center gap-6">
          <img
            className="w-[200px] h-auto"
            alt="Logo FUNDEB"
            src="/chatgpt-image-5-de-mai--de-2025--09-32-20-1.png"
          />

          <div className="flex flex-col items-center gap-2">
            <h1 className="[font-family:'Inter',Helvetica] font-semibold text-[#181d27] text-3xl tracking-[0] leading-tight text-center">
              Bem-vindo ao Sistema FUNDEB
            </h1>
            <p className="font-text-md-regular font-[number:var(--text-md-regular-font-weight)] text-[#535861] text-[length:var(--text-md-regular-font-size)] tracking-[var(--text-md-regular-letter-spacing)] leading-[var(--text-md-regular-line-height)] [font-style:var(--text-md-regular-font-style)] text-center">
              Faça login para acessar o painel de simulações
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 w-full bg-white rounded-lg shadow-lg p-8 border border-[#e9e9eb]"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[#181d27] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]"
            >
              E-mail ou Usuário
            </label>
            <Input
              id="email"
              type="text"
              placeholder="Digite seu e-mail ou usuário"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 border-[#e9e9eb] focus-visible:ring-[#22a3eb] focus-visible:ring-offset-0"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[#181d27] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)]"
            >
              Senha
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 pr-10 border-[#e9e9eb] focus-visible:ring-[#22a3eb] focus-visible:ring-offset-0"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#535861] hover:text-[#22a3eb] transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <Link
              to="/esqueci-senha"
              className="font-text-sm-medium font-[number:var(--text-sm-medium-font-weight)] text-[#22a3eb] text-[length:var(--text-sm-medium-font-size)] tracking-[var(--text-sm-medium-letter-spacing)] leading-[var(--text-sm-medium-line-height)] [font-style:var(--text-sm-medium-font-style)] hover:underline"
            >
              Esqueci minha senha
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-[#22a3eb] hover:bg-[#1a8ac9] text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Entrar
          </Button>
        </form>
      </div>
    </section>
  );
};
