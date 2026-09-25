import type { CharacterConfig } from '../config/CharacterConfig';
import type { CharacterState } from '../state/CharacterState';
import type { AnimationConfig } from './AnimationConfig';

const placeholderAnimation: AnimationConfig = {
  id: 'placeholder',
  frames: [],
  frameDuration: 1000,
  loop: true,
};

export function resolveAnimation(
  state: CharacterState,
  config: CharacterConfig,
): AnimationConfig {
  const requestedAnimation = getAnimationForState(state, config);

  if (requestedAnimation && requestedAnimation.frames.length > 0) {
    return requestedAnimation;
  }

  if (config.animations.idle.frames.length > 0) {
    return config.animations.idle;
  }

  return placeholderAnimation;
}

function getAnimationForState(
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
