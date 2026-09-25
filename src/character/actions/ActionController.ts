import type { CharacterAction } from './CharacterAction';
import { selectAction } from './ActionSelector';
import { randomBetween } from '../../shared/random';

const IDLE_MIN_DURATION = 2;
const IDLE_MAX_DURATION = 10;

const WALK_MIN_DURATION = 3;
const WALK_MAX_DURATION = 8;

export class ActionController {
  private currentAction: CharacterAction | null = null;
  private remainingTime = 0;

  update(deltaTime: number): void {
    if (this.currentAction === null) {
      this.selectNextAction();
      return;
    }

    this.remainingTime -= deltaTime;

    if (this.remainingTime <= 0) {
      this.selectNextAction();
    }
  }

  reset(): void {
    this.currentAction = null;
    this.remainingTime = 0;
  }

  selectNextAction(): CharacterAction {
    const nextAction = selectAction();

    this.currentAction = nextAction;

    if (nextAction === 'wait') {
      this.remainingTime = randomBetween(IDLE_MIN_DURATION, IDLE_MAX_DURATION);
    } else {
      this.remainingTime = randomBetween(WALK_MIN_DURATION, WALK_MAX_DURATION);
    }

    return nextAction;
  }

  getCurrentAction(): CharacterAction | null {
    return this.currentAction;
  }

  cancel(): void {
    this.currentAction = null;
    this.remainingTime = 0;
  }
}
