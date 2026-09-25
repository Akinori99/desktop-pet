import { useRef, type PointerEventHandler } from 'react';

import { moveWindow } from '../../platform/WindowService';

interface UseCharacterDragResult {
  onPointerDown: PointerEventHandler<HTMLDivElement>;
  onPointerMove: PointerEventHandler<HTMLDivElement>;
  onPointerUp: PointerEventHandler<HTMLDivElement>;
  onPointerCancel: PointerEventHandler<HTMLDivElement>;
}

export function useCharacterDrag(): UseCharacterDragResult {
  const activePointerIdRef = useRef<number | null>(null);
  const draggingRef = useRef(false);

  const onPointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
    if (draggingRef.current) {
      return;
    }

    activePointerIdRef.current = event.pointerId;
    draggingRef.current = true;

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    if (
      !draggingRef.current ||
      activePointerIdRef.current !== event.pointerId
    ) {
      return;
    }

    void moveWindow({
      x: event.screenX,
      y: event.screenY,
    });
  };

  const finishDrag = (event: React.PointerEvent<HTMLDivElement>): void => {
    if (activePointerIdRef.current !== event.pointerId) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    activePointerIdRef.current = null;
    draggingRef.current = false;
  };

  const onPointerUp: PointerEventHandler<HTMLDivElement> = (event) => {
    finishDrag(event);
  };

  const onPointerCancel: PointerEventHandler<HTMLDivElement> = (event) => {
    finishDrag(event);
  };

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
  };
}
