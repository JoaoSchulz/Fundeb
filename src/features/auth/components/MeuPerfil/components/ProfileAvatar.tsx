import { User } from "lucide-react";

interface ProfileAvatarProps {
  name: string;
  email: string;
  isEditing: boolean;
}

export const ProfileAvatar = ({
  name,
  email,
  isEditing,
}: ProfileAvatarProps): JSX.Element => (
  <div className="flex flex-col items-center gap-4 md:items-start md:w-48 shrink-0">
    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#22a3eb] to-[#1c8ec9] flex items-center justify-center">
      <User className="w-12 h-12 text-white" strokeWidth={1.5} />
    </div>
    {!isEditing && (
      <div className="text-center md:text-left">
        <p className="font-['Inter',Helvetica] font-semibold text-[#181d27] text-lg">
          {name}
        </p>
        <p className="font-['Inter',Helvetica] font-normal text-[#535861] text-sm mt-1">
          {email}
        </p>
      </div>
    )}
  </div>
);

