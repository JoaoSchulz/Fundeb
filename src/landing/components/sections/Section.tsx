import React from "react";

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

export const Section = ({
  id,
  title,
  children,
  className = "",
  dark = false,
}: SectionProps): JSX.Element => {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 scroll-mt-20 ${dark ? "bg-[#181d27] text-white" : "bg-white"} ${className}`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6 md:mb-8">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
};

