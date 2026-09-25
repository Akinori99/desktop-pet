import { ActionController } from '../actions/ActionController';
import type { CharacterAction } from '../actions/CharacterAction';
import { AnimationPlayer } from '../animation/AnimationPlayer';
import { resolveAnimation } from '../animation/AnimationResolver';
import type { CharacterConfig } from '../config/CharacterConfig';
import type { CharacterSnapshot } from '../model/CharacterSnapshot';
import type { Direction } from '../model/Direction';
import type { Position } from '../model/Position';
import type { Velocity } from '../model/Velocity';
import { CharacterStateMachine } from '../state/CharacterStateMachine';
import type { ScreenBounds } from '../../platform/ScreenService';
import { clampHorizontalPosition } from '../../physics/screenBoundary';

export class CharacterController {
  private readonly config: CharacterConfig;
  private position: Position;
  private velocity: Velocity;
  private direction: Direction;

  private readonly stateMachine: CharacterStateMachine;
  private readonly actionController: ActionController;
  private readonly animationPlayer: AnimationPlayer;

  private screenBounds: ScreenBounds | null = null;

  constructor(config: CharacterConfig, initialPosition: Position) {
    this.config = config;
    this.position = { ...initialPosition };
    this.velocity = { x: 0, y: 0 };
    this.direction = 'right';

    this.stateMachine = new CharacterStateMachine('idle');
    this.actionController = new ActionController();
    this.animationPlayer = new AnimationPlayer();

    this.updateAnimation();
  }

  update(deltaTime: number): void {
    const currentState = this.stateMachine.getCurrentState();

    if (currentState === 'idle' || currentState === 'walk') {
      this.actionController.update(deltaTime);

      const action = this.actionController.getCurrentAction();

      if (action !== null) {
        this.applyAction(action);
      }
    } else {
      this.actionController.cancel();
    }

    const state = this.stateMachine.getCurrentState();

    switch (state) {
      case 'idle':
        this.updateIdle(deltaTime);
        break;

      case 'walk':
        this.updateWalk(deltaTime);
        break;

      case 'grabbed':
        this.updateGrabbed(deltaTime);
        break;

      case 'fall':
        this.updateFall(deltaTime);
        break;

      case 'land':
        this.updateLand(deltaTime);
        break;
    }

    this.updateAnimation();
    this.animationPlayer.update(deltaTime);
  }

  setDirection(direction: Direction): void {
    this.direction = direction;
  }

  setScreenBounds(screenBounds: ScreenBounds): void {
    this.screenBounds = screenBounds;
  }

  getSnapshot(): CharacterSnapshot {
    return {
      state: this.stateMachine.getCurrentState(),
      position: { ...this.position },
      velocity: { ...this.velocity },
      direction: this.direction,
      frameSrc:
        this.animationPlayer.getCurrentFrame() ??
        this.config.animations.idle.frames[0] ??
        '',
    };
  }

  private updateAnimation(): void {
    const state = this.stateMachine.getCurrentState();

    const animation = resolveAnimation(state, this.config);

    this.animationPlayer.play(animation);
  }

  private applyAction(action: CharacterAction): void {
    switch (action) {
      case 'wait':
        this.stateMachine.transition('idle');
        break;

      case 'walkLeft':
        this.direction = 'left';
        this.stateMachine.transition('walk');
        break;

      case 'walkRight':
        this.direction = 'right';
        this.stateMachine.transition('walk');
        break;
    }
  }

  private updateIdle(_deltaTime: number): void {}

  private updateWalk(deltaTime: number): void {
    const distance = this.config.movement.walkSpeed * deltaTime;

    if (this.direction === 'right') {
      this.position.x += distance;
    } else {
      this.position.x -= distance;
    }

    this.checkHorizontalBoundary();
  }

  private checkHorizontalBoundary(): void {
    if (!this.screenBounds) {
      return;
    }

    const previousX = this.position.x;

    const clampedX = clampHorizontalPosition(
      previousX,
      this.config.size.width,
      this.screenBounds,
    );

    if (clampedX === previousX) {
      return;
    }

    this.position.x = clampedX;

    if (this.stateMachine.getCurrentState() === 'walk') {
      this.stateMachine.transition('idle');
    }

    this.direction = this.direction === 'right' ? 'left' : 'right';
  }

  private updateGrabbed(_deltaTime: number): void {}

  private updateFall(_deltaTime: number): void {}

  private updateLand(_deltaTime: number): void {}
}
