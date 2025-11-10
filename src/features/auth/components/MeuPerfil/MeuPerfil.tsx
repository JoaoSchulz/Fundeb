import React, { useState } from "react";
import { toast } from "sonner";
import { CardContent } from "../../../../components/ui/card";
import { ProfileHeader, ProfileAvatar, ProfileForm } from "./components";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  organization: string;
}

const initialProfile: UserProfile = {
  name: "João Silva",
  email: "joao.silva@fundeb.gov.br",
  phone: "(19) 99999-9999",
  location: "Campinas - SP",
  organization: "Secretaria Municipal de Educação",
};

export const MeuPerfil = (): JSX.Element => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(initialProfile);

  const handleEdit = (): void => {
    setEditedProfile(profile);
    setIsEditing(true);
  };

  const handleCancel = (): void => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleSave = (): void => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast.success("Perfil atualizado com sucesso!");
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
                onChange={handleChange}
                onSave={handleSave}
                onCancel={handleCancel}
                onEdit={handleEdit}
              />
            </div>
          </CardContent>
        </div>
      </div>
    </section>
  );
};

