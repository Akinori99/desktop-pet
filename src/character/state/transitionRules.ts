import type { CharacterState } from './CharacterState';

export const transitionRules: Record<CharacterState, CharacterState[]> = {
  idle: ['walk', 'grabbed', 'fall'],
  walk: ['idle', 'grabbed', 'fall'],
  grabbed: ['fall', 'idle'],
  fall: ['land'],
  land: ['idle', 'grabbed'],
};
