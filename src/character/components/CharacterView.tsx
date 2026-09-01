import type { PointerEventHandler } from 'react';
import './CharacterView.css';

export type CharacterDirection = 'left' | 'right';

interface CharacterViewProps {
  frameSrc: string;
  direction: CharacterDirection;
  width: number;
  height: number;
  onPointerDown?: PointerEventHandler<HTMLDivElement>;
  onPointerMove?: PointerEventHandler<HTMLDivElement>;
  onPointerUp?: PointerEventHandler<HTMLDivElement>;
  onPointerCancel?: PointerEventHandler<HTMLDivElement>;
}

export function CharacterView({
  frameSrc,
  direction,
  width,
  height,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
}: CharacterViewProps) {
  return (
    <div
      className="character-hit-area"
      style={{
        width,
        height,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      <img
        className={`character ${direction}`}
        src={frameSrc}
        alt=""
        draggable={false}
      />
    </div>
  );
}
