import { useCallback, useRef, useState } from 'react';

import type { CharacterConfig } from '../config/CharacterConfig';
import { CharacterController } from '../controller/CharacterController';
import type { CharacterSnapshot } from '../model/CharacterSnapshot';
import type { Position } from '../model/Position';
import type { ScreenBounds } from '../../platform/ScreenService';
import { useGameLoop } from './useGameLoop';

interface UseCharacterResult {
  snapshot: CharacterSnapshot;
  startGrab(): void;
  moveGrabbed(position: Position): void;
  releaseGrab(): void;
  setScreenBounds(bounds: ScreenBounds): void;
  setGroundY(groundY: number): void;
}

export function useCharacter(
  config: CharacterConfig,
  initialPosition: Position,
): UseCharacterResult {
  const controllerRef = useRef<CharacterController | null>(null);

  if (controllerRef.current === null) {
    controllerRef.current = new CharacterController(config, initialPosition);
  }

  const controller = controllerRef.current;

  const [snapshot, setSnapshot] = useState<CharacterSnapshot>(() =>
    controller.getSnapshot(),
  );

  useGameLoop((deltaTime) => {
    controller.update(deltaTime);
    setSnapshot(controller.getSnapshot());
  });

  const startGrab = useCallback(() => {
    controller.startGrab();
    setSnapshot(controller.getSnapshot());
  }, [controller]);

  const moveGrabbed = useCallback(
    (position: Position) => {
      controller.moveGrabbed(position);
      setSnapshot(controller.getSnapshot());
    },
    [controller],
  );

  const releaseGrab = useCallback(() => {
    controller.releaseGrab();
    setSnapshot(controller.getSnapshot());
  }, [controller]);

  const setScreenBounds = useCallback(
    (bounds: ScreenBounds) => {
      controller.setScreenBounds(bounds);
    },
    [controller],
  );

  const setGroundY = useCallback(
    (groundY: number) => {
      controller.setGroundY(groundY);
    },
    [controller],
  );

  return {
    snapshot,
    startGrab,
    moveGrabbed,
    releaseGrab,
    setScreenBounds,
    setGroundY,
  };
}
