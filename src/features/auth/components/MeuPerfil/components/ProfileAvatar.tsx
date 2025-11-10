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
  <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-[#e9e9eb]">
    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#22a3eb] to-[#1c8ec9] flex items-center justify-center shrink-0 shadow-md">
      <User className="w-10 h-10 text-white" strokeWidth={1.5} />
    </div>
    {!isEditing && (
      <div className="text-center sm:text-left">
        <p className="font-['Inter',Helvetica] font-semibold text-[#181d27] text-xl">
          {name}
        </p>
        <p className="font-['Inter',Helvetica] font-normal text-[#535861] text-sm mt-1">
          {email}
        </p>
      </div>
    )}
  </div>
);

