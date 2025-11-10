import { Check as CheckIcon } from "lucide-react";
import React from "react";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export const StepIndicator = ({
  steps,
  currentStep,
}: StepIndicatorProps): JSX.Element => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center flex-1 relative z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isCompleted
                      ? "bg-[#22a3eb] text-white"
                      : isCurrent
                        ? "bg-[#22a3eb] text-white ring-4 ring-sky-100"
                        : "bg-neutral-100 text-[#717680]"
                  }`}
                >
                  {isCompleted ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    <span className="font-semibold">{step.id}</span>
                  )}
                </div>
                <div className="flex flex-col items-center mt-3 text-center max-w-[120px]">
                  <span
                    className={`font-text-sm-semibold font-[number:var(--text-sm-semibold-font-weight)] text-[length:var(--text-sm-semibold-font-size)] tracking-[var(--text-sm-semibold-letter-spacing)] leading-[var(--text-sm-semibold-line-height)] [font-style:var(--text-sm-semibold-font-style)] ${
                      isCurrent || isCompleted
                        ? "text-[#181d27]"
                        : "text-[#717680]"
                    }`}
                  >
                    {step.title}
                  </span>
                  <span className="hidden md:block font-text-xs-regular font-[number:var(--text-xs-regular-font-weight)] text-[#717680] text-[length:var(--text-xs-regular-font-size)] tracking-[var(--text-xs-regular-letter-spacing)] leading-[var(--text-xs-regular-line-height)] [font-style:var(--text-xs-regular-font-style)] mt-1">
                    {step.description}
                  </span>
                </div>
              </div>

              {!isLast && (
                <div className="flex-1 h-px bg-neutral-200 -mt-12 mx-2">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isCompleted ? "bg-[#22a3eb] w-full" : "bg-transparent w-0"
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
