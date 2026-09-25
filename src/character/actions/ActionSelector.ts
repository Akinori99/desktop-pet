import type { CharacterAction } from './CharacterAction';
import { randomBetween } from '../../shared/random';

interface WeightedAction {
  action: CharacterAction;
  weight: number;
}

const actions: WeightedAction[] = [
  {
    action: 'wait',
    weight: 40,
  },
  {
    action: 'walkLeft',
    weight: 30,
  },
  {
    action: 'walkRight',
    weight: 30,
  },
];

export function selectAction(): CharacterAction {
  const totalWeight = actions.reduce((total, item) => total + item.weight, 0);

  let randomValue = randomBetween(0, totalWeight);

  for (const item of actions) {
    if (randomValue < item.weight) {
      return item.action;
    }

    randomValue -= item.weight;
  }

  return actions[actions.length - 1].action;
}
