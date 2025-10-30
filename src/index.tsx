import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/common";
import { Layout } from "./components/layout";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./features/auth/hooks";
import { SimulationProvider } from "./features/simulation/hooks";
import { Login, ForgotPassword, MeuPerfil } from "./features/auth/components";
import { DashboardPor } from "./features/simulation/components/DashboardPor/DashboardPor";
import { MinhasSimulacoes } from "./features/simulation/components/MinhasSimulacoes/MinhasSimulacoes";
import { NovaSimulacao } from "./features/simulation/components/NovaSimulacao/NovaSimulacao";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SimulationProvider>
          <Toaster />
          <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/esqueci-senha" element={<ForgotPassword />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout>
                  <DashboardPor />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/simulacoes"
            element={
              <PrivateRoute>
                <Layout>
                  <MinhasSimulacoes />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/nova-simulacao"
            element={
              <PrivateRoute>
                <Layout>
                  <NovaSimulacao />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <PrivateRoute>
                <Layout>
                  <MeuPerfil />
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
        </SimulationProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
