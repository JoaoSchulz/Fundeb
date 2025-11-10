import React from "react";
import { LucideIcon } from "lucide-react";
import { Input } from "../../../../../components/ui/input";

interface ProfileFieldProps {
  label: string;
  icon: LucideIcon;
  value: string;
  isEditing: boolean;
  type?: string;
  onChange?: (value: string) => void;
}

export const ProfileField = ({
  label,
  icon: Icon,
  value,
  isEditing,
  type = "text",
  onChange,
}: ProfileFieldProps): JSX.Element => (
  <div className="flex flex-col gap-2">
    <label className="font-['Inter',Helvetica] font-medium text-[#181d27] text-sm flex items-center gap-2">
      <Icon className="w-4 h-4 text-[#535861]" />
      {label}
    </label>
    <Input
      type={type}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={!isEditing}
      size="md"
    />
  </div>
);

