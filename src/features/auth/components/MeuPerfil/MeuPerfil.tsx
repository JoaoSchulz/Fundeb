import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CardContent } from "../../../../components/ui/card";
import { ProfileHeader, ProfileAvatar, ProfileForm } from "./components";
import { useAuth } from "../../hooks";
import { AuthService } from "../../services/authService";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  municipio: string;
  uf: string;
  organization: string;
  role: string;
}

const emptyProfile: UserProfile = {
  name: "",
  email: "",
  phone: "",
  municipio: "",
  uf: "",
  organization: "",
  role: "cliente",
};

const mapAuthUserToProfile = (user: any): UserProfile => {
  if (!user) return emptyProfile;
  const name = user.nome || user.name || "";
  const email = user.email || "";
  const phone = user.telefone || user.phone || "";
  const municipio = user.municipio || "";
  const uf = user.uf || "";
  const organization = user.organizacao || user.organização || user.organization || "";
  const role = user.role || "cliente";
  return { name, email, phone, municipio, uf, organization, role };
};

export const MeuPerfil = (): JSX.Element => {
  const { user, refreshUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile>(mapAuthUserToProfile(user));
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(mapAuthUserToProfile(user));
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  // Carregar dados atualizados do backend na montagem do componente
  useEffect(() => {
    const loadProfile = async () => {
      try {
        await refreshUser();
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
      } finally {
        setIsLoadingProfile(false);
      }
    };
    
    loadProfile();
  }, []);

  useEffect(() => {
    // Atualiza o estado do perfil sempre que o usuário autenticado mudar
    const mapped = mapAuthUserToProfile(user);
    setProfile(mapped);
    setEditedProfile(mapped);
  }, [user]);

  const handleEdit = (): void => {
    setEditedProfile(profile);
    setIsEditing(true);
  };

  const handleCancel = (): void => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleSave = async (): Promise<void> => {
    // Validações antes de enviar
    if (!editedProfile.name || editedProfile.name.trim() === '') {
      toast.error("Nome é obrigatório");
      return;
    }

    if (!editedProfile.email || editedProfile.email.trim() === '') {
      toast.error("Email é obrigatório");
      return;
    }

    // Validação de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editedProfile.email)) {
      toast.error("Email inválido");
      return;
    }

    // Validação de UF
    if (editedProfile.uf && editedProfile.uf.length !== 2) {
      toast.error("UF deve ter 2 caracteres");
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        nome: editedProfile.name.trim(),
        email: editedProfile.email.trim(),
        telefone: editedProfile.phone?.trim() || null,
        municipio: editedProfile.municipio?.trim() || null,
        uf: editedProfile.uf?.trim().toUpperCase() || null,
        organizacao: editedProfile.organization?.trim() || null,
        role: editedProfile.role || "cliente",
      };

      await AuthService.updateProfile(payload);
      await refreshUser();
      
      // Atualizar estado local com dados atualizados
      const mapped = mapAuthUserToProfile(await AuthService.getProfile());
      setProfile(mapped);
      setEditedProfile(mapped);
      setIsEditing(false);
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      toast.error("Erro ao atualizar perfil. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: keyof UserProfile, value: string): void => {
    setEditedProfile((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="flex flex-col items-start gap-8 pt-8 pb-12 px-0 w-full bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(239,246,255,1)_50%,rgba(236,238,243,1)_100%)] min-h-screen">
      <div className="flex flex-col items-start gap-6 w-full px-4 md:px-6 lg:px-8">
        <ProfileHeader />

        <div className="w-full max-w-[1400px] mx-auto bg-white rounded-xl border border-solid border-[#e9e9eb] shadow-sm overflow-hidden">
          <CardContent className="p-6 md:p-8">
            {isLoadingProfile ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                  <p className="mt-4 text-gray-600">Carregando perfil...</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                {/* Avatar e Nome acima */}
                <ProfileAvatar
                  name={profile.name}
                  email={profile.email}
                  isEditing={isEditing}
                />
                
                {/* Informações Pessoais abaixo */}
                <ProfileForm
                  profile={isEditing ? editedProfile : profile}
                  isEditing={isEditing}
                  isSaving={isSaving}
                  onChange={handleChange}
                  onSave={handleSave}
                  onCancel={handleCancel}
                  onEdit={handleEdit}
                />
              </div>
            )}
          </CardContent>
        </div>
      </div>
    </section>
  );
};

