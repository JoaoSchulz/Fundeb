import { useEffect, useRef, useState } from "react";

interface UseScrollPositionProps {
  tableScrollRef: React.RefObject<HTMLDivElement>;
  pageScrollContainerRef: React.RefObject<HTMLDivElement>;
  isLoading: boolean;
}

interface UseScrollPositionReturn {
  saveScrollPosition: () => void;
  restoreScrollPosition: () => void;
}

export const useScrollPosition = ({
  tableScrollRef,
  pageScrollContainerRef,
  isLoading,
}: UseScrollPositionProps): UseScrollPositionReturn => {
  const [savedScrollPosition, setSavedScrollPosition] = useState(0);
  const [savedPageScrollPosition, setSavedPageScrollPosition] = useState(0);

  const saveScrollPosition = (): void => {
    // Salvar posição do scroll da tabela
    if (tableScrollRef.current) {
      setSavedScrollPosition(tableScrollRef.current.scrollTop);
    }

    // Salvar posição do scroll da página
    // O Layout usa um container com overflow-y-auto que é o scroll principal
    let scrollPosition = 0;
    if (pageScrollContainerRef.current) {
      // Procurar o container de scroll pai (do Layout)
      let parent = pageScrollContainerRef.current.parentElement;
      while (parent) {
        const style = window.getComputedStyle(parent);
        if (style.overflowY === "auto" || style.overflowY === "scroll") {
          scrollPosition = parent.scrollTop;
          break;
        }
        parent = parent.parentElement;
      }
      // Se não encontrou, usar window scroll como fallback
      if (scrollPosition === 0) {
        scrollPosition = window.scrollY;
      }
    } else {
      scrollPosition = window.scrollY;
    }
    setSavedPageScrollPosition(scrollPosition);
  };

  const restoreScrollPosition = (): void => {
    if (!isLoading) {
      // Usar setTimeout para garantir que o DOM esteja atualizado
      setTimeout(() => {
        // Restaurar scroll da tabela
        if (tableScrollRef.current && savedScrollPosition > 0) {
          tableScrollRef.current.scrollTop = savedScrollPosition;
          setSavedScrollPosition(0);
        }

        // Restaurar scroll da página
        if (savedPageScrollPosition > 0 && pageScrollContainerRef.current) {
          // Procurar o container de scroll pai (do Layout)
          let parent = pageScrollContainerRef.current.parentElement;
          let scrollRestored = false;
          while (parent) {
            const style = window.getComputedStyle(parent);
            if (style.overflowY === "auto" || style.overflowY === "scroll") {
              parent.scrollTop = savedPageScrollPosition;
              scrollRestored = true;
              break;
            }
            parent = parent.parentElement;
          }
          // Se não encontrou, usar window scroll como fallback
          if (!scrollRestored) {
            window.scrollTo(0, savedPageScrollPosition);
          }
          setSavedPageScrollPosition(0);
        }
      }, 50);
    }
  };

  useEffect(() => {
    restoreScrollPosition();
  }, [isLoading, savedScrollPosition, savedPageScrollPosition]);

  return {
    saveScrollPosition,
    restoreScrollPosition,
  };
};

