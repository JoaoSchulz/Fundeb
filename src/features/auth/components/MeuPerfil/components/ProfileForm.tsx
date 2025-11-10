import { Mail, MapPin, Phone, User, Save, X } from "lucide-react";
import { Separator } from "../../../../../components/ui/separator";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { LAYOUT_CONSTANTS } from "../../../../../utils/constants";
import { ProfileField } from "./ProfileField";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  organization: string;
}

interface ProfileFormProps {
  profile: UserProfile;
  isEditing: boolean;
  onChange: (field: keyof UserProfile, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
}

export const ProfileForm = ({
  profile,
  isEditing,
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
            className={`${LAYOUT_CONSTANTS.BUTTON.HEIGHT} px-4 border-[#d0d3d9] text-[#181d27] hover:bg-[#f5f5f6]`}
          >
            Editar Perfil
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProfileField
          label="Nome Completo"
          icon={User}
          value={profile.name}
          isEditing={isEditing}
          onChange={(value) => onChange("name", value)}
        />
        <ProfileField
          label="E-mail"
          icon={Mail}
          value={profile.email}
          isEditing={isEditing}
          type="email"
          onChange={(value) => onChange("email", value)}
        />
        <ProfileField
          label="Telefone"
          icon={Phone}
          value={profile.phone}
          isEditing={isEditing}
          type="tel"
          onChange={(value) => onChange("phone", value)}
        />
        <ProfileField
          label="Localização"
          icon={MapPin}
          value={profile.location}
          isEditing={isEditing}
          onChange={(value) => onChange("location", value)}
        />
        <div className="md:col-span-2">
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
      </div>
    </div>

    {isEditing && (
      <>
        <Separator className="w-full" />
        <div className="flex justify-end gap-3">
          <Button
            onClick={onCancel}
            variant="outline"
            className={`${LAYOUT_CONSTANTS.BUTTON.HEIGHT} px-6 border-[#d0d3d9] text-[#181d27] hover:bg-[#f5f5f6]`}
          >
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </Button>
          <Button
            onClick={onSave}
            className={`${LAYOUT_CONSTANTS.BUTTON.PRIMARY} px-6`}
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>
      </>
    )}
  </div>
);

