import { useRef, type PointerEvent, type PointerEventHandler } from 'react';

import type { Position } from '../model/Position';
import { getWindowPosition, moveWindow } from '../../platform/WindowService';

interface UseCharacterDragOptions {
  onStart?: () => void;
  onMove?: (position: Position) => void;
  onRelease?: () => void;
  onCancel?: () => void;
}

interface UseCharacterDragResult {
  onPointerDown: PointerEventHandler<HTMLDivElement>;
  onPointerMove: PointerEventHandler<HTMLDivElement>;
  onPointerUp: PointerEventHandler<HTMLDivElement>;
  onPointerCancel: PointerEventHandler<HTMLDivElement>;
}

export function useCharacterDrag(
  options: UseCharacterDragOptions = {},
): UseCharacterDragResult {
  const activePointerIdRef = useRef<number | null>(null);
  const draggingRef = useRef(false);

  const dragOffsetRef = useRef<Position>({
    x: 0,
    y: 0,
  });

  const onPointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
    if (draggingRef.current) {
      return;
    }

    activePointerIdRef.current = event.pointerId;
    draggingRef.current = true;

    event.currentTarget.setPointerCapture(event.pointerId);

    options.onStart?.();

    void getWindowPosition()
      .then((windowPosition) => {
        if (
          !draggingRef.current ||
          activePointerIdRef.current !== event.pointerId
        ) {
          return;
        }

        dragOffsetRef.current = {
          x: event.screenX - windowPosition.x,
          y: event.screenY - windowPosition.y,
        };
      })
      .catch((error: unknown) => {
        console.error('[INPUT] failed to get window position', error);
      });
  };

  const onPointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    if (
      !draggingRef.current ||
      activePointerIdRef.current !== event.pointerId
    ) {
      return;
    }

    const newWindowPosition: Position = {
      x: event.screenX - dragOffsetRef.current.x,
      y: event.screenY - dragOffsetRef.current.y,
    };

    options.onMove?.(newWindowPosition);

    void moveWindow(newWindowPosition);
  };

  const finishDrag = (event: PointerEvent<HTMLDivElement>): boolean => {
    if (activePointerIdRef.current !== event.pointerId) {
      return false;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    activePointerIdRef.current = null;
    draggingRef.current = false;

    dragOffsetRef.current = {
      x: 0,
      y: 0,
    };

    return true;
  };

  const onPointerUp: PointerEventHandler<HTMLDivElement> = (event) => {
    const released = finishDrag(event);

    if (released) {
      options.onRelease?.();
    }
  };

  const onPointerCancel: PointerEventHandler<HTMLDivElement> = (event) => {
    const cancelled = finishDrag(event);

    if (cancelled) {
      options.onCancel?.();
    }
  };

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
  };
}
