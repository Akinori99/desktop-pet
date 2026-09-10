import type { AnimationConfig } from '../animation/AnimationConfig';

export interface CharacterConfig {
  id: string;
  name: string;

  size: {
    width: number;
    height: number;
  };

  movement: {
    walkSpeed: number;
    gravity: number;
  };

  behavior: {
    idleMinDuration: number;
    idleMaxDuration: number;
    walkMinDuration: number;
    walkMaxDuration: number;
  };

  animations: {
    idle: AnimationConfig;
    walk: AnimationConfig;
    fall?: AnimationConfig;
    land?: AnimationConfig;
    grabbed?: AnimationConfig;
  };
}
