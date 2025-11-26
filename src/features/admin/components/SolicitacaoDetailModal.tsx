import { useState } from "react";
import { X, Mail, Building2, Calendar, MessageSquare, MapPin, User, Shield, Lock } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { SolicitacoesService, SolicitacaoAcesso } from "../../../services/solicitacoesService";

interface SolicitacaoDetailModalProps {
  solicitacao: SolicitacaoAcesso | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const SolicitacaoDetailModal = ({ solicitacao, isOpen, onClose, onSuccess }: SolicitacaoDetailModalProps) => {
  const [senhaTemporaria, setSenhaTemporaria] = useState("");
  const [role, setRole] = useState<'admin' | 'cliente'>('cliente');
  const [motivoRejeicao, setMotivoRejeicao] = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!solicitacao) return null;

  const handleAprovar = async () => {
    if (!senhaTemporaria || senhaTemporaria.length < 6) {
      toast.error("Senha temporária deve ter no mínimo 6 caracteres");
      return;
    }

    setIsProcessing(true);
    try {
      const result = await SolicitacoesService.aprovarSolicitacao(solicitacao.id, {
        role,
        senha_temporaria: senhaTemporaria
      });

      toast.success(
        `Solicitação aprovada! Usuário criado como ${role}.\nSenha temporária: ${result.senha_temporaria}`
      );
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Erro ao aprovar solicitação:', error);
      toast.error(error?.message || "Erro ao aprovar solicitação");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleNegar = async () => {
    setIsProcessing(true);
    try {
      await SolicitacoesService.negarSolicitacao(solicitacao.id, {
        motivo: motivoRejeicao || undefined
      });

      toast.success("Solicitação negada");
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Erro ao negar solicitação:', error);
      toast.error(error?.message || "Erro ao negar solicitação");
    } finally {
      setIsProcessing(false);
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

  const getStatusColor = (status: string) => {
    const colors = {
      pendente: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      aprovado: 'bg-green-100 text-green-800 border-green-200',
      negado: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status as keyof typeof colors];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Detalhes da Solicitação</span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(solicitacao.status)}`}>
              {solicitacao.status.charAt(0).toUpperCase() + solicitacao.status.slice(1)}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações do Solicitante */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5" />
              {solicitacao.nome}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm truncate">{solicitacao.email}</span>
              </div>

              {solicitacao.uf && solicitacao.municipio && (
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{solicitacao.municipio} - {solicitacao.uf}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-gray-600">
                <Building2 className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{solicitacao.orgao_publico}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{formatDate(solicitacao.criado_em)}</span>
              </div>
            </div>

            {solicitacao.mensagem && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Mensagem</p>
                    <p className="text-sm text-gray-600">{solicitacao.mensagem}</p>
                  </div>
                </div>
              </div>
            )}

            {solicitacao.motivo_rejeicao && (
              <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                <p className="text-sm text-red-700">
                  <strong>Motivo da recusa:</strong> {solicitacao.motivo_rejeicao}
                </p>
              </div>
            )}
          </div>

          {/* Formulário de Aprovação/Rejeição */}
          {solicitacao.status === 'pendente' && !showRejectForm && (
            <div className="space-y-4 border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-900">Aprovar Solicitação</h3>
              
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Lock className="w-4 h-4" />
                  Senha Temporária
                </label>
                <Input
                  type="password"
                  value={senhaTemporaria}
                  onChange={(e) => setSenhaTemporaria(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Shield className="w-4 h-4" />
                  Nível de Acesso
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'admin' | 'cliente')}
                  className="w-full h-11 px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="cliente">Usuário</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleAprovar}
                  disabled={isProcessing}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  Aprovar e Criar Usuário
                </Button>
                <Button
                  onClick={() => setShowRejectForm(true)}
                  disabled={isProcessing}
                  variant="outline"
                  className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
                >
                  Negar Solicitação
                </Button>
              </div>
            </div>
          )}

          {/* Formulário de Rejeição */}
          {showRejectForm && (
            <div className="space-y-4 border-t pt-4">
              <h3 className="text-lg font-semibold text-red-900">Negar Solicitação</h3>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Motivo da Recusa (opcional)
                </label>
                <textarea
                  value={motivoRejeicao}
                  onChange={(e) => setMotivoRejeicao(e.target.value)}
                  placeholder="Descreva o motivo..."
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={() => setShowRejectForm(false)}
                  disabled={isProcessing}
                  variant="outline"
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleNegar}
                  disabled={isProcessing}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  Confirmar Recusa
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
