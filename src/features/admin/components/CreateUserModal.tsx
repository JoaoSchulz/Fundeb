import { useState, useEffect } from "react";
import { toast } from "sonner";
import { User, Mail, Lock, Phone, MapPin, Building2, Shield } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { UsersService, CreateUserData } from "../../../services/usersService";
import { LocalidadesService } from "../../localidades/services/localidadesService";
import type { MunicipioCategorias } from "../../../types/api";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const UFS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

export const CreateUserModal = ({ isOpen, onClose, onSuccess }: CreateUserModalProps): JSX.Element => {
  const [formData, setFormData] = useState<CreateUserData>({
    nome: "",
    email: "",
    senha: "",
    role: "cliente",
    telefone: "",
    municipio: "",
    uf: "",
    organizacao: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [municipios, setMunicipios] = useState<MunicipioCategorias[]>([]);
  const [isLoadingMunicipios, setIsLoadingMunicipios] = useState(false);

  // Carregar municípios quando a UF mudar
  useEffect(() => {
    if (!formData.uf) {
      setMunicipios([]);
      return;
    }

    const loadMunicipios = async () => {
      setIsLoadingMunicipios(true);
      try {
        const data = await LocalidadesService.getMunicipiosByUF(formData.uf);
        setMunicipios(data);
      } catch (error) {
        console.error("Erro ao carregar municípios:", error);
        toast.error("Erro ao carregar municípios");
        setMunicipios([]);
      } finally {
        setIsLoadingMunicipios(false);
      }
    };

    loadMunicipios();
  }, [formData.uf]);

  const handleChange = (field: keyof CreateUserData, value: string) => {
    setFormData((prev: CreateUserData) => {
      // Se mudou a UF, limpar o município selecionado
      if (field === "uf") {
        return { ...prev, [field]: value, municipio: "" };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!formData.nome.trim()) {
      toast.error("Nome é obrigatório");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Email é obrigatório");
      return;
    }
    if (!formData.senha || formData.senha.length < 6) {
      toast.error("Senha deve ter no mínimo 6 caracteres");
      return;
    }

    setIsSubmitting(true);
    try {
      // Remove campos vazios opcionais
      const dataToSend: CreateUserData = {
        nome: formData.nome.trim(),
        email: formData.email.trim(),
        senha: formData.senha,
        role: formData.role
      };

      if (formData.telefone?.trim()) {
        dataToSend.telefone = formData.telefone.trim();
      }
      if (formData.municipio?.trim()) {
        dataToSend.municipio = formData.municipio.trim();
      }
      if (formData.uf?.trim()) {
        dataToSend.uf = formData.uf.trim();
      }
      if (formData.organizacao?.trim()) {
        dataToSend.organizacao = formData.organizacao.trim();
      }

      await UsersService.createUser(dataToSend);
      toast.success("Usuário criado com sucesso!");
      
      // Resetar formulário
      setFormData({
        nome: "",
        email: "",
        senha: "",
        role: "cliente",
        telefone: "",
        municipio: "",
        uf: "",
        organizacao: ""
      });
      
      onSuccess();
      onClose();
    } catch (error: any) {
      const message = error?.response?.data?.error || "Erro ao criar usuário";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        nome: "",
        email: "",
        senha: "",
        role: "cliente",
        telefone: "",
        municipio: "",
        uf: "",
        organizacao: ""
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <User className="w-5 h-5" />
            Criar Novo Usuário
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          {/* Informações Básicas */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Informações Básicas
            </h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4" />
                Nome Completo *
              </label>
              <Input
                type="text"
                placeholder="Digite o nome completo"
                value={formData.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email *
              </label>
              <Input
                type="email"
                placeholder="usuario@exemplo.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Senha *
              </label>
              <Input
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={formData.senha}
                onChange={(e) => handleChange("senha", e.target.value)}
                required
                minLength={6}
                disabled={isSubmitting}
              />
              <p className="text-xs text-gray-500">
                A senha deve ter no mínimo 6 caracteres
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Perfil de Acesso *
              </label>
              <Select
                value={formData.role}
                onValueChange={(value) => handleChange("role", value as "admin" | "cliente")}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cliente">Usuário</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Informações de Contato */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Informações de Contato
            </h3>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Telefone
              </label>
              <Input
                type="tel"
                placeholder="(00) 00000-0000"
                value={formData.telefone}
                onChange={(e) => handleChange("telefone", e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Informações de Localização */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Localização
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Estado (UF)
                </label>
                <Select
                  value={formData.uf}
                  onValueChange={(value) => handleChange("uf", value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {UFS.map((uf) => (
                      <SelectItem key={uf} value={uf}>
                        {uf}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Município
                </label>
                <Select
                  value={formData.municipio}
                  onValueChange={(value) => handleChange("municipio", value)}
                  disabled={isSubmitting || !formData.uf || isLoadingMunicipios}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={
                      !formData.uf 
                        ? "Selecione primeiro o estado" 
                        : isLoadingMunicipios 
                        ? "Carregando..." 
                        : "Selecione o município"
                    } />
                  </SelectTrigger>
                  <SelectContent>
                    {municipios.map((mun) => (
                      <SelectItem key={mun.id} value={mun.municipio}>
                        {mun.municipio}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Informações Organizacionais */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Organização
            </h3>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Nome da Organização
              </label>
              <Input
                type="text"
                placeholder="Secretaria, Prefeitura, etc."
                value={formData.organizacao}
                onChange={(e) => handleChange("organizacao", e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Criando...
                </>
              ) : (
                "Criar Usuário"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
