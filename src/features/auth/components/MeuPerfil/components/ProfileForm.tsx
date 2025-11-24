import { Mail, Phone, User, Save, X } from "lucide-react";
import { Separator } from "../../../../../components/ui/separator";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { LAYOUT_CONSTANTS } from "../../../../../utils/constants";
import { ProfileField } from "./ProfileField";
import { ProfileLocationSelector } from "./ProfileLocationSelector";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  cidade: string;
  uf: string;
  organization: string;
  role: string;
}

interface ProfileFormProps {
  profile: UserProfile;
  isEditing: boolean;
  isSaving?: boolean;
  onChange: (field: keyof UserProfile, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
}

export const ProfileForm = ({
  profile,
  isEditing,
  isSaving = false,
  onChange,
  onSave,
  onCancel,
  onEdit,
}: ProfileFormProps): JSX.Element => (
  <div className="flex-1 space-y-6">
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-['Inter',Helvetica] font-semibold text-[#181d27] text-lg">
          Informações Pessoais
        </h2>
        {!isEditing && (
          <Button
            onClick={onEdit}
            variant="outline"
            disabled={isSaving}
            className={`${LAYOUT_CONSTANTS.BUTTON.HEIGHT} px-4 border-[#d0d3d9] text-[#181d27] hover:bg-[#f5f5f6]`}
          >
            Editar Perfil
          </Button>
        )}
      </div>
      
      {/* Layout customizado: 
          Linha 1: Nome + Telefone
          Linha 2: Email (largura total)
          Linha 3: UF (pequeno) + Município (grande)
          Linha 4: Organização (largura total)
      */}
      <div className="space-y-4">
        {/* Linha 1: Nome e Telefone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProfileField
            label="Nome Completo"
            icon={User}
            value={profile.name}
            isEditing={isEditing}
            onChange={(value) => onChange("name", value)}
          />
          <ProfileField
            label="Telefone"
            icon={Phone}
            value={profile.phone}
            isEditing={isEditing}
            type="tel"
            onChange={(value) => onChange("phone", value)}
          />
        </div>

        {/* Linha 2: Email (largura total) */}
        <div>
          <ProfileField
            label="E-mail"
            icon={Mail}
            value={profile.email}
            isEditing={isEditing}
            type="email"
            onChange={(value) => onChange("email", value)}
          />
        </div>

        {/* Linha 3: UF (pequeno) + Município (grande) */}
        <div className="grid grid-cols-[160px_1fr] md:grid-cols-[180px_1fr] gap-4">
          <ProfileLocationSelector
            uf={profile.uf}
            cidade={profile.cidade}
            isEditing={isEditing}
            onUfChange={(value) => onChange("uf", value)}
            onCidadeChange={(value) => onChange("cidade", value)}
          />
        </div>

        {/* Linha 4: Organização (largura total) */}
        <div>
          <div className="flex flex-col gap-2">
            <label className="font-['Inter',Helvetica] font-medium text-[#181d27] text-sm">
              Organização
            </label>
            <Input
              type="text"
              value={profile.organization}
              onChange={(e) => onChange("organization", e.target.value)}
              disabled={!isEditing}
              size="md"
            />
          </div>
        </div>

        {/* Linha 5: Nível de Acesso */}
        <div>
          <div className="flex flex-col gap-2">
            <label className="font-['Inter',Helvetica] font-medium text-[#181d27] text-sm">
              Nível de Acesso
            </label>
            <select
              value={profile.role}
              onChange={(e) => onChange("role", e.target.value)}
              disabled={!isEditing}
              className="flex h-10 w-full rounded-md border border-[#d0d3d9] bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#858d9d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="cliente">Usuário</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    {isEditing && (
      <>
        <Separator className="w-full" />
        <div className="flex justify-end gap-3">
          <Button
            onClick={onCancel}
            variant="outline"
            disabled={isSaving}
            className={`${LAYOUT_CONSTANTS.BUTTON.HEIGHT} px-6 border-[#d0d3d9] text-[#181d27] hover:bg-[#f5f5f6]`}
          >
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </Button>
          <Button
            onClick={onSave}
            disabled={isSaving}
            className={`${LAYOUT_CONSTANTS.BUTTON.PRIMARY} px-6`}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </>
    )}
  </div>
);

