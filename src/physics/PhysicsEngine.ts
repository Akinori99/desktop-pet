import type { Position } from '../character/model/Position';
import type { Velocity } from '../character/model/Velocity';

export class PhysicsEngine {
  applyGravity(
    _position: Position,
    _velocity: Velocity,
    _deltaTime: number,
  ): void {}

  isGrounded(
    _position: Position,
    _characterHeight: number,
    _groundY: number,
  ): boolean {
    return false;
  }

  resolveGroundCollision(
    _position: Position,
    _velocity: Velocity,
    _characterHeight: number,
    _groundY: number,
  ): void {}
}
