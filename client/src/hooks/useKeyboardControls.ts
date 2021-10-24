import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

interface UseKeyboardControlsReturn {
  cardsContainerRef: RefObject<HTMLDivElement>;
}

export function useKeyboardControls(): UseKeyboardControlsReturn {
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);

  useEffect(() => {
    if (focusIndex !== null) {
      const cardsElements = cardsContainerRef?.current?.children;

      if (cardsElements) {
        const element = cardsElements[focusIndex]?.firstElementChild as
          | HTMLButtonElement
          | undefined;

        element?.focus();
      }
    }
  }, [focusIndex]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!cardsContainerRef.current) {
        return;
      }

      const isArrowLeftKey = event.code === 'ArrowLeft';
      const isArrowRightKey = event.code === 'ArrowRight';

      if (!isArrowLeftKey && !isArrowRightKey) {
        return;
      }

      const cardsCount = cardsContainerRef.current.childElementCount - 1;

      if (isArrowLeftKey) {
        if (focusIndex === null) {
          setFocusIndex(cardsCount);
        } else {
          setFocusIndex((state) => {
            if (state !== null && state > 0) {
              return state - 1;
            } else {
              return cardsCount;
            }
          });
        }
      }

      if (isArrowRightKey) {
        if (focusIndex === null) {
          setFocusIndex(0);
        } else {
          setFocusIndex((state) => {
            if (state !== null && state < cardsCount) {
              return state + 1;
            } else {
              return 0;
            }
          });
        }
      }
    },
    [focusIndex],
  );

  useEffect(() => {
    document.body.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return { cardsContainerRef };
}
