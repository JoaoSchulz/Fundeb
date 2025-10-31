import * as React from "react";
import { cn } from "../../utils/cn";
import { HelpCircle, AlertCircle } from "lucide-react";
import { Tooltip } from "./tooltip";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  hint?: string;
  isInvalid?: boolean;
  errorMessage?: string;
  size?: "sm" | "md" | "lg";
  icon?: React.ComponentType<{ className?: string }>;
  tooltip?: string;
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      hint,
      isInvalid,
      errorMessage,
      id,
      size = "md",
      icon: Icon,
      tooltip,
      required,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();
    const hintId = `${inputId}-hint`;
    const errorId = `${inputId}-error`;

    const sizeClasses = {
      sm: "h-10 px-3 text-sm",
      md: "h-11 px-3 text-sm",
      lg: "h-12 px-3 text-sm",
    };

    const iconSizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-5 h-5",
    };

    const hasLabelOrHint = label || hint || errorMessage;
    const inputElement = (
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717680] pointer-events-none">
            <Icon className={iconSizeClasses[size]} />
          </div>
        )}
      <input
          id={inputId}
        type={type}
          ref={ref}
          disabled={disabled}
        className={cn(
            "flex w-full rounded-lg border bg-white text-[#181d27] ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:cursor-not-allowed transition-colors",
            sizeClasses[size],
            Icon ? "pl-10" : "",
            isInvalid
              ? "border-[#d92c20] focus-visible:ring-[#d92c20]"
              : "border-[#d0d3d9] focus-visible:ring-[#22a3eb]",
            disabled && "bg-[#f9fafb] text-[#535861] border-[#e9e9eb]",
          className
        )}
          aria-invalid={isInvalid}
          aria-describedby={
            hint || errorMessage
              ? errorMessage
                ? errorId
                : hintId
              : undefined
          }
          aria-required={required}
        {...props}
      />
        {isInvalid && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#d92c20] pointer-events-none">
            <AlertCircle className={iconSizeClasses[size]} />
          </div>
        )}
      </div>
    );

    if (!hasLabelOrHint) {
      return inputElement;
    }

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <div className="flex items-center gap-1.5">
            <label
              htmlFor={inputId}
              className="font-['Inter',Helvetica] font-medium text-[#181d27] text-sm"
            >
              {label}
              {required && <span className="text-[#d92c20] ml-0.5">*</span>}
            </label>
            {tooltip && (
              <Tooltip content={tooltip}>
                <button
                  type="button"
                  className="text-[#717680] hover:text-[#535861] transition-colors"
                  tabIndex={-1}
                >
                  <HelpCircle className={iconSizeClasses[size]} />
                </button>
              </Tooltip>
            )}
          </div>
        )}
        {inputElement}
        {errorMessage && isInvalid && (
          <p
            id={errorId}
            className="font-['Inter',Helvetica] font-normal text-[#d92c20] text-sm flex items-center gap-1.5"
          >
            <AlertCircle className="w-4 h-4" />
            {errorMessage}
          </p>
        )}
        {hint && !errorMessage && (
          <p
            id={hintId}
            className="font-['Inter',Helvetica] font-normal text-[#535861] text-sm"
          >
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
