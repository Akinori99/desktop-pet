import type { CharacterConfig } from '../config/CharacterConfig';
import type { Direction } from '../model/Direction';
import type { Position } from '../model/Position';
import type { Velocity } from '../model/Velocity';
import { CharacterStateMachine } from '../state/CharacterStateMachine';

export class CharacterController {
  private readonly config: CharacterConfig;

  private position: Position;

  private velocity: Velocity;

  private direction: Direction;

  private readonly stateMachine: CharacterStateMachine;

  constructor(config: CharacterConfig, initialPosition: Position) {
    this.config = config;

    this.position = {
      ...initialPosition,
    };

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.direction = 'right';

    this.stateMachine = new CharacterStateMachine('idle');
  }
}
