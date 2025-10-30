import { Button } from "../../../../../components/ui/button";
import { LAYOUT_CONSTANTS } from "../../../../../utils/constants";

interface ProfileHeaderProps {
  isEditing: boolean;
  onEdit: () => void;
}

export const ProfileHeader = ({
  isEditing,
  onEdit,
}: ProfileHeaderProps): JSX.Element => (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full max-w-[1400px] mx-auto">
    <div className="flex flex-col gap-1">
      <h1 className="font-['Inter',Helvetica] font-semibold text-[#181d27] text-2xl tracking-[0] leading-[32px]">
        Meu Perfil
      </h1>
      <p className="font-['Inter',Helvetica] font-normal text-[#535861] text-sm tracking-[0] leading-[20px]">
        Gerencie suas informações pessoais e preferências
      </p>
    </div>
    {!isEditing && (
      <Button
        onClick={onEdit}
        variant="outline"
        className={`${LAYOUT_CONSTANTS.BUTTON.HEIGHT} px-6 border-[#d0d3d9] text-[#181d27] hover:bg-[#f5f5f6]`}
      >
        Editar Perfil
      </Button>
    )}
  </div>
);

