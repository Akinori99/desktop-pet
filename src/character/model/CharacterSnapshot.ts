import type { CharacterState } from '../state/CharacterState';
import type { Direction } from './Direction';
import type { Position } from './Position';
import type { Velocity } from './Velocity';

export interface CharacterSnapshot {
  state: CharacterState;
  position: Position;
  velocity: Velocity;
  direction: Direction;
  frameSrc: string;
}
