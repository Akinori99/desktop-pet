import { useCallback } from 'react';

import type { CharacterController } from '../controller/CharacterController';
import { moveWindow } from '../../platform/WindowService';

export function useCharacterMovement(
  controller: CharacterController,
): (deltaTime: number) => void {
  return useCallback(
    (deltaTime: number) => {
      controller.update(deltaTime);

      const snapshot = controller.getSnapshot();

      void moveWindow(snapshot.position);
    },
    [controller],
  );
}
