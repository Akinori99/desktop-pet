import type { Position } from '../character/model/Position';
import type { Velocity } from '../character/model/Velocity';

export class PhysicsEngine {
  private readonly gravity: number;

  constructor(gravity = 1800) {
    this.gravity = gravity;
  }

  applyGravity(
    position: Position,
    velocity: Velocity,
    deltaTime: number,
  ): void {
    velocity.y += this.gravity * deltaTime;
    position.y += velocity.y * deltaTime;
  }

  isGrounded(
    position: Position,
    characterHeight: number,
    groundY: number,
  ): boolean {
    return position.y + characterHeight >= groundY;
  }

  resolveGroundCollision(
    _position: Position,
    _velocity: Velocity,
    _characterHeight: number,
    _groundY: number,
  ): void {}
}
