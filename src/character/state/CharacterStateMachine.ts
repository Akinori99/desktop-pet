import type { CharacterState } from './CharacterState';
import { transitionRules } from './transitionRules';

export class CharacterStateMachine {
  private currentState: CharacterState;

  constructor(initialState: CharacterState) {
    this.currentState = initialState;
  }

  getCurrentState(): CharacterState {
    return this.currentState;
  }

  canTransition(nextState: CharacterState): boolean {
    if (this.currentState === nextState) {
      return true;
    }

    return transitionRules[this.currentState].includes(nextState);
  }

  transition(nextState: CharacterState): boolean {
    if (this.currentState === nextState) {
      return true;
    }

    if (!this.canTransition(nextState)) {
      return false;
    }

    this.currentState = nextState;
    return true;
  }
}
