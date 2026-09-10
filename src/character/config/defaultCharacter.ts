import type { CharacterConfig } from './CharacterConfig';

import idleFrame01 from '../../assets/characters/default/idle/01.png';
import walkFrame01 from '../../assets/characters/default/walk/01.png';

export const defaultCharacterConfig: CharacterConfig = {
  id: 'default',
  name: 'Default Character',

  size: {
    width: 160,
    height: 160,
  },

  movement: {
    walkSpeed: 60,
    gravity: 1800,
  },

  behavior: {
    idleMinDuration: 2000,
    idleMaxDuration: 10000,
    walkMinDuration: 3000,
    walkMaxDuration: 8000,
  },

  animations: {
    idle: {
      id: 'idle',
      frames: [idleFrame01],
      frameDuration: 500,
      loop: true,
    },

    walk: {
      id: 'walk',
      frames: [walkFrame01],
      frameDuration: 200,
      loop: true,
    },
  },
};
