import { getCurrentWindow } from '@tauri-apps/api/window';

import type { Position } from '../character/model/Position';
import { invokeCommand } from './tauriClient';

export async function moveWindow(position: Position): Promise<void> {
  await invokeCommand<void>('move_pet_window', {
    x: position.x,
    y: position.y,
  });
}

export async function getWindowPosition(): Promise<Position> {
  return invokeCommand<Position>('get_pet_window_position');
}

export async function setAlwaysOnTop(enabled: boolean): Promise<void> {
  const window = getCurrentWindow();

  await window.setAlwaysOnTop(enabled);
}

export async function show(): Promise<void> {
  const window = getCurrentWindow();

  await window.show();
}

export async function hide(): Promise<void> {
  const window = getCurrentWindow();

  await window.hide();
}
