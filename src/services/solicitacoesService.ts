import { http } from './http/client';

export interface SolicitacaoAcesso {
  id: string;
  nome: string;
  email: string;
  uf: string | null;
  municipio: string | null;
  orgao_publico: string;
  mensagem: string | null;
  status: 'pendente' | 'aprovado' | 'negado';
  role_solicitado: 'admin' | 'cliente';
  usuario_criado_id: string | null;
  avaliado_por: string | null;
  avaliado_em: string | null;
  motivo_rejeicao: string | null;
  criado_em: string;
  atualizado_em: string;
}

export interface CreateSolicitacaoData {
  nome: string;
  email: string;
  uf?: string;
  municipio?: string;
  orgao_publico: string;
  mensagem?: string;
}

export interface AprovarSolicitacaoData {
  role: 'admin' | 'cliente';
  senha_temporaria: string;
}

export interface NegarSolicitacaoData {
  motivo?: string;
}

export class SolicitacoesService {
  /**
   * Cria uma nova solicitação de acesso (público)
   */
  static async createSolicitacao(data: CreateSolicitacaoData): Promise<{ message: string; solicitacao: SolicitacaoAcesso }> {
    const response = await http.post<{ message: string; solicitacao: SolicitacaoAcesso }>(
      '/solicitacoes',
      data
    );
    return response.data;
  }

  /**
   * Lista todas as solicitações (apenas admins)
   */
  static async getSolicitacoes(status?: 'pendente' | 'aprovado' | 'negado'): Promise<SolicitacaoAcesso[]> {
    const response = await http.get<SolicitacaoAcesso[]>(
      '/solicitacoes',
      { query: status ? { status } : {} }
    );
    return response.data;
  }

  /**
   * Aprova uma solicitação e cria o usuário (apenas admins)
   */
  static async aprovarSolicitacao(id: string, data: AprovarSolicitacaoData): Promise<{ message: string; usuario: any; senha_temporaria: string }> {
    const response = await http.post<{ message: string; usuario: any; senha_temporaria: string }>(
      `/solicitacoes/${id}/aprovar`,
      { body: data }
    );
    return response.data;
  }

  /**
   * Nega uma solicitação (apenas admins)
   */
  static async negarSolicitacao(id: string, data?: NegarSolicitacaoData): Promise<{ message: string }> {
    const response = await http.post<{ message: string }>(
      `/solicitacoes/${id}/negar`,
      { body: data || {} }
    );
    return response.data;
  }
}
