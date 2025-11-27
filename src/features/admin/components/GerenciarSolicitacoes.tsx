import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Shield, Eye } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { SolicitacoesService, SolicitacaoAcesso } from "../../../services/solicitacoesService";
import { useAuth } from "../../auth/hooks";
import { SolicitacaoDetailModal } from "./SolicitacaoDetailModal";

export const GerenciarSolicitacoes = (): JSX.Element => {
  const { user } = useAuth();
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoAcesso[]>([]);
  const [filtro, setFiltro] = useState<'todas' | 'pendente' | 'aprovado' | 'negado'>('todas');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSolicitacao, setSelectedSolicitacao] = useState<SolicitacaoAcesso | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadSolicitacoes();
  }, [filtro]);

  const loadSolicitacoes = async () => {
    setIsLoading(true);
    try {
      const status = filtro === 'todas' ? undefined : filtro;
      const data = await SolicitacoesService.getSolicitacoes(status);
      setSolicitacoes(data);
    } catch (error) {
      console.error('Erro ao carregar solicitações:', error);
      toast.error("Erro ao carregar solicitações");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (solicitacao: SolicitacaoAcesso) => {
    setSelectedSolicitacao(solicitacao);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSolicitacao(null);
  };

  const handleSuccess = () => {
    loadSolicitacoes();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pendente: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      aprovado: 'bg-green-100 text-green-800 border-green-200',
      negado: 'bg-red-100 text-red-800 border-red-200'
    };
    const labels = {
      pendente: 'Pendente',
      aprovado: 'Aprovado',
      negado: 'Negado'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Acesso Negado</h2>
            <p className="text-gray-600">
              Apenas administradores podem acessar esta página.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gerenciar Solicitações de Acesso
          </h1>
          <p className="text-gray-600">
            Aprove ou negue solicitações de novos usuários
          </p>
        </div>

        {/* Filtros */}
        <div className="mb-6 flex gap-3">
          {['todas', 'pendente', 'aprovado', 'negado'].map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filtro === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando solicitações...</p>
          </div>
        )}

        {/* Lista de Solicitações */}
        {!isLoading && solicitacoes.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500 text-lg">
                Nenhuma solicitação encontrada
              </p>
            </CardContent>
          </Card>
        )}

        {!isLoading && solicitacoes.length > 0 && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {solicitacoes.map((solicitacao) => (
              <div key={solicitacao.id} className="flex items-center justify-between gap-4 p-4 hover:bg-gray-50 border-b border-gray-200 last:border-b-0 transition-colors">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div>
                    <p className="font-medium text-gray-900">{solicitacao.nome}</p>
                    <p className="text-sm text-gray-500">{solicitacao.email}</p>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    {solicitacao.orgao_publico}
                  </div>
                  
                  <div>
                    {getStatusBadge(solicitacao.status)}
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    {formatDate(solicitacao.criado_em)}
                  </div>
                </div>
                
                <Button
                  onClick={() => handleViewDetails(solicitacao)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Ver Detalhes
                </Button>
              </div>
            ))}
          </div>
        )}

        <SolicitacaoDetailModal
          solicitacao={selectedSolicitacao}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
        />
      </div>
    </div>
  );
};
