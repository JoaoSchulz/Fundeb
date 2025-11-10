import { useNavigate, useLocation } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Layout } from "../../components/layout";
import { PrivateRoute } from "../../components/common";

/**
 * Página 404 - Página não encontrada
 * 
 * Aguardando backend: Esta página trata rotas inválidas dentro e fora do app.
 * Quando o backend estiver disponível, pode ser necessário ajustar a lógica
 * para redirecionar usuários autenticados corretamente.
 */
const NotFoundContent = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  // Verificar se está tentando acessar uma rota do app sem estar autenticado
  const isAppRoute = location.pathname.startsWith("/app");

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4 py-12">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <h1 className="text-9xl font-bold text-[#22a3eb]/20 mb-4">404</h1>
            <h2 className="text-3xl font-semibold text-[#181d27] mb-3">
              Página não encontrada
            </h2>
            <p className="text-base text-[#535861] leading-relaxed">
              A página que você está procurando não existe ou foi movida.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="h-11 px-6 border-[#d0d3d9] text-[#181d27] hover:bg-[#f5f5f6]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <Button
              onClick={() => navigate("/app")}
              className="bg-[#22a3eb] hover:bg-[#1d8bc7] text-white h-11 px-6"
            >
              <Home className="w-4 h-4 mr-2" />
              Ir para o Painel
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const NotFound = (): JSX.Element => {
  const location = useLocation();
  const isAppRoute = location.pathname.startsWith("/app");

  // Se é uma rota do app, requer autenticação
  if (isAppRoute) {
    return (
      <PrivateRoute>
        <NotFoundContent />
      </PrivateRoute>
    );
  }

  // Para rotas públicas, mostrar sem autenticação
  return <NotFoundContent />;
};

