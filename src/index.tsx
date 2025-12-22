import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { PrivateRoute } from "./components/common";
import { AdminRoute } from "./components/common/AdminRoute";
import { Layout } from "./components/layout";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./features/auth/hooks";
import { HideValuesProvider } from "./hooks/useHideValues";
import { SimulationProvider } from "./features/simulation/hooks";
import { Login, ForgotPassword, ForgotPasswordSuccess, MeuPerfil } from "./features/auth/components";
import { LandingPage } from "./landing";
import { DashboardPor } from "./features/simulation/components/DashboardPor/DashboardPor";
import { MinhasSimulacoes } from "./features/simulation/components/MinhasSimulacoes/MinhasSimulacoes";
import { NovaSimulacao } from "./features/simulation/components/NovaSimulacao/NovaSimulacao";
import { EditarSimulacao } from "./features/simulation/components/EditarSimulacao";
import { GerenciarSolicitacoes, AtualizarDados } from "./features/admin";
import { NotFound } from "./pages/NotFound";
import { CalculadorasPage } from "./pages/Calculadoras";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <HideValuesProvider>
        <SimulationProvider>
            <Toaster />
          <Routes>
          {/* Landing Page - Pública */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Rotas de Autenticação - Públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/auth/login" element={<Navigate to="/login" replace />} />
          <Route path="/esqueci-senha" element={<ForgotPassword />} />
          <Route path="/auth/esqueci-senha" element={<Navigate to="/esqueci-senha" replace />} />
          <Route path="/esqueci-senha/sucesso" element={<ForgotPasswordSuccess />} />
          
          {/* Rotas do Simulador - Protegidas */}
          <Route
            path="/app"
            element={
              <PrivateRoute>
                <Layout>
                  <DashboardPor />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/app/simulacoes"
            element={
              <PrivateRoute>
                <Layout>
                  <MinhasSimulacoes />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/app/nova-simulacao"
            element={
              <PrivateRoute>
                <Layout>
                  <NovaSimulacao />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/app/editar-simulacao/:id"
            element={
              <PrivateRoute>
                <Layout>
                  <EditarSimulacao />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/app/perfil"
            element={
              <PrivateRoute>
                <Layout>
                  <MeuPerfil />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/app/calculadoras"
            element={
              <PrivateRoute>
                <Layout>
                  <CalculadorasPage />
                </Layout>
              </PrivateRoute>
            }
          />
          
          {/* Rota Admin - Protegida para role admin */}
          <Route
            path="/app/admin/solicitacoes"
            element={
              <AdminRoute>
                <Layout>
                  <GerenciarSolicitacoes />
                </Layout>
              </AdminRoute>
            }
          />
          <Route
            path="/app/admin/atualizar"
            element={
              <AdminRoute>
                <Layout>
                  <AtualizarDados />
                </Layout>
              </AdminRoute>
            }
          />
          
          {/* Rota 404 - Deve ser a última */}
          <Route path="*" element={<NotFound />} />
        </Routes>
          
        </SimulationProvider>
        </HideValuesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
