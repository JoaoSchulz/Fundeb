import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Check, X, Shield, Mail, Building2, Calendar, MessageSquare } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { SolicitacoesService, SolicitacaoAcesso } from "../../../services/solicitacoesService";
import { useAuth } from "../../auth/hooks";

export const GerenciarSolicitacoes = (): JSX.Element => {
  const { user } = useAuth();
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoAcesso[]>([]);
  const [filtro, setFiltro] = useState<'todas' | 'pendente' | 'aprovado' | 'negado'>('todas');
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

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

  const handleAprovar = async (solicitacao: SolicitacaoAcesso) => {
    const senha = prompt("Digite a senha temporária para o novo usuário (mínimo 6 caracteres):");
    if (!senha || senha.length < 6) {
      toast.error("Senha temporária deve ter no mínimo 6 caracteres");
      return;
    }

    const role = confirm("Conceder acesso de ADMIN? (Cancele para usuário comum)") ? 'admin' : 'cliente';

    setProcessingId(solicitacao.id);
    try {
      const result = await SolicitacoesService.aprovarSolicitacao(solicitacao.id, {
        role,
        senha_temporaria: senha
      });

      toast.success(
        `Solicitação aprovada! Usuário criado como ${role}.\nSenha temporária: ${result.senha_temporaria}`
      );
      loadSolicitacoes();
    } catch (error: any) {
      console.error('Erro ao aprovar solicitação:', error);
      toast.error(error?.message || "Erro ao aprovar solicitação");
    } finally {
      setProcessingId(null);
    }
  };

  const handleNegar = async (solicitacao: SolicitacaoAcesso) => {
    const motivo = prompt("Motivo da recusa (opcional):");

    setProcessingId(solicitacao.id);
    try {
      await SolicitacoesService.negarSolicitacao(solicitacao.id, {
        motivo: motivo || undefined
      });

      toast.success("Solicitação negada");
      loadSolicitacoes();
    } catch (error: any) {
      console.error('Erro ao negar solicitação:', error);
      toast.error(error?.message || "Erro ao negar solicitação");
    } finally {
      setProcessingId(null);
    }
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
          <div className="space-y-4">
            {solicitacoes.map((solicitacao) => (
              <Card key={solicitacao.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {solicitacao.nome}
                        </h3>
                        {getStatusBadge(solicitacao.status)}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span className="text-sm">{solicitacao.email}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-600">
                          <Building2 className="w-4 h-4" />
                          <span className="text-sm">{solicitacao.orgao_publico}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{formatDate(solicitacao.criado_em)}</span>
                        </div>
                      </div>

                      {solicitacao.mensagem && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-start gap-2">
                            <MessageSquare className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-700">{solicitacao.mensagem}</p>
                          </div>
                        </div>
                      )}

                      {solicitacao.motivo_rejeicao && (
                        <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100">
                          <p className="text-sm text-red-700">
                            <strong>Motivo da recusa:</strong> {solicitacao.motivo_rejeicao}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {solicitacao.status === 'pendente' && (
                    <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
                      <Button
                        onClick={() => handleAprovar(solicitacao)}
                        disabled={processingId === solicitacao.id}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Aprovar
                      </Button>
                      <Button
                        onClick={() => handleNegar(solicitacao)}
                        disabled={processingId === solicitacao.id}
                        variant="outline"
                        className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Negar
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
