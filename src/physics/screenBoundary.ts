import type { ScreenBounds } from '../platform/ScreenService';

export function clampHorizontalPosition(
  x: number,
  characterWidth: number,
  screenBounds: ScreenBounds,
): number {
  const minX = screenBounds.x;

  const maxX = screenBounds.x + screenBounds.width - characterWidth;

  return Math.max(minX, Math.min(x, maxX));
}
