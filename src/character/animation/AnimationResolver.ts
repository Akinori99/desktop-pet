import type { CharacterConfig } from '../config/CharacterConfig';
import type { CharacterState } from '../state/CharacterState';
import type { AnimationConfig } from './AnimationConfig';

export function resolveAnimation(
  state: CharacterState,
  config: CharacterConfig,
): AnimationConfig | undefined {
  switch (state) {
    case 'idle':
      return config.animations.idle;

    case 'walk':
      return config.animations.walk;

    case 'grabbed':
      return config.animations.grabbed;

    case 'fall':
      return config.animations.fall;

    case 'land':
      return config.animations.land;
  }
}
