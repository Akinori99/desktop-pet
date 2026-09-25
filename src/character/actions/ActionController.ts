import type { CharacterAction } from './CharacterAction';
import { selectAction } from './ActionSelector';

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
    this.remainingTime = 0;

    return nextAction;
  }

  cancel(): void {
    this.currentAction = null;
    this.remainingTime = 0;
  }
}
