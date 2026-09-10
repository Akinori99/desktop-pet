import { invokeCommand } from './tauriClient';

export interface ScreenBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export async function getPrimaryScreen(): Promise<ScreenBounds> {
  return invokeCommand<ScreenBounds>('get_screen_bounds');
}

export async function getCurrentScreen(): Promise<ScreenBounds> {
  return invokeCommand<ScreenBounds>('get_screen_bounds');
}

export async function getUsableArea(): Promise<ScreenBounds> {
  return invokeCommand<ScreenBounds>('get_usable_screen_bounds');
}
