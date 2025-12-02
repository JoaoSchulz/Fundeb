import { http } from './http/client';

export interface CreateUserData {
  nome: string;
  email: string;
  senha: string;
  role: 'admin' | 'cliente';
  telefone?: string;
  municipio?: string;
  uf?: string;
  organizacao?: string;
}

export interface UserResponse {
  id: string;
  nome: string;
  email: string;
  role: 'admin' | 'cliente';
  telefone?: string;
  municipio?: string;
  uf?: string;
  organizacao?: string;
  criado_em: string;
}

export class UsersService {
  /**
   * Cria um novo usuário (apenas admins)
   */
  static async createUser(data: CreateUserData): Promise<{ message: string; user: UserResponse }> {
    const response = await http.post<{ message: string; user: UserResponse }>(
      '/usuarios',
      data
    );
    return response.data;
  }
}
