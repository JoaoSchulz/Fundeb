interface NavigationLogoProps {
  isCollapsed: boolean;
}

export const NavigationLogo = ({
  isCollapsed,
}: NavigationLogoProps): JSX.Element => {
  if (isCollapsed) {
    return (
      <img
        className="w-12 h-12 object-contain transition-opacity duration-300"
        alt="Ícone FUNDEB"
        src="/icone-fundeb.png"
      />
    );
  }

  return (
    <img
      className="w-[188px] h-auto max-h-[79px] object-contain transition-opacity duration-300"
      alt="Logo FUNDEB"
      src="/logo-fundeb.png"
    />
  );
};

