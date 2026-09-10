import type { Position } from '../character/model/Position';
import { getUsableArea, type ScreenBounds } from './ScreenService';
import { moveWindow } from './WindowService';

const PET_WINDOW_WIDTH = 180;
const PET_WINDOW_HEIGHT = 180;
const RIGHT_MARGIN = 20;

function calculateInitialPosition(screenBounds: ScreenBounds): Position {
  return {
    x: screenBounds.x + screenBounds.width - PET_WINDOW_WIDTH - RIGHT_MARGIN,
    y: screenBounds.y + screenBounds.height - PET_WINDOW_HEIGHT,
  };
}

export async function setInitialPetPosition(): Promise<Position> {
  const usableArea = await getUsableArea();

  const position = calculateInitialPosition(usableArea);

  await moveWindow(position);

  return position;
}
