import type { AnimationConfig } from './AnimationConfig';
import type { AnimationState } from './AnimationState';

export class AnimationPlayer {
  private config: AnimationConfig | null = null;

  private state: AnimationState = {
    animationId: '',
    currentFrame: 0,
    elapsedTime: 0,
    completed: false,
  };

  play(config: AnimationConfig): void {
    if (this.config?.id === config.id) {
      return;
    }

    this.config = config;

    this.state = {
      animationId: config.id,
      currentFrame: 0,
      elapsedTime: 0,
      completed: false,
    };
  }

  update(deltaTime: number): void {
    if (!this.config || this.state.completed) {
      return;
    }

    if (this.config.frames.length === 0) {
      this.state.completed = true;
      return;
    }

    this.state.elapsedTime += deltaTime * 1000;

    while (this.state.elapsedTime >= this.config.frameDuration) {
      this.state.elapsedTime -= this.config.frameDuration;

      const nextFrame = this.state.currentFrame + 1;

      if (nextFrame >= this.config.frames.length) {
        if (this.config.loop) {
          this.state.currentFrame = 0;
          continue;
        }

        this.state.currentFrame = this.config.frames.length - 1;

        this.state.completed = true;
        return;
      }

      this.state.currentFrame = nextFrame;
    }
  }

  getCurrentFrame(): string | null {
    if (!this.config) {
      return null;
    }

    return this.config.frames[this.state.currentFrame] ?? null;
  }

  isCompleted(): boolean {
    return this.state.completed;
  }

  reset(): void {
    this.config = null;

    this.state = {
      animationId: '',
      currentFrame: 0,
      elapsedTime: 0,
      completed: false,
    };
  }
}
