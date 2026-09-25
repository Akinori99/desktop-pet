import { useEffect, useState } from 'react';

import './App.css';
import { CharacterView } from './character/components/CharacterView';
import { defaultCharacterConfig } from './character/config/defaultCharacter';
import { useCharacter } from './character/hooks/useCharacter';
import { useCharacterDrag } from './character/hooks/useCharacterDrag';
import type { Position } from './character/model/Position';
import {
  getGroundY,
  getUsableArea,
  type ScreenBounds,
} from './platform/ScreenService';
import { setInitialPetPosition } from './platform/initialPosition';
import { moveWindow } from './platform/WindowService';

interface CharacterAppProps {
  initialPosition: Position;
  screenBounds: ScreenBounds;
  groundY: number;
}

function CharacterApp({
  initialPosition,
  screenBounds,
  groundY,
}: CharacterAppProps) {
  const {
    snapshot,
    startGrab,
    moveGrabbed,
    releaseGrab,
    setScreenBounds,
    setGroundY,
  } = useCharacter(defaultCharacterConfig, initialPosition);

  const dragHandlers = useCharacterDrag({
    onStart: startGrab,
    onMove: moveGrabbed,
    onRelease: releaseGrab,
    onCancel: releaseGrab,
  });

  useEffect(() => {
    setScreenBounds(screenBounds);
    setGroundY(groundY);
  }, [groundY, screenBounds, setGroundY, setScreenBounds]);

  useEffect(() => {
    if (snapshot.state === 'grabbed') {
      return;
    }

    void moveWindow(snapshot.position);
  }, [snapshot.position.x, snapshot.position.y, snapshot.state]);

  return (
    <main className="pet-app">
      <CharacterView
        frameSrc={snapshot.frameSrc}
        direction={snapshot.direction}
        width={defaultCharacterConfig.size.width}
        height={defaultCharacterConfig.size.height}
        onPointerDown={dragHandlers.onPointerDown}
        onPointerMove={dragHandlers.onPointerMove}
        onPointerUp={dragHandlers.onPointerUp}
        onPointerCancel={dragHandlers.onPointerCancel}
      />
    </main>
  );
}

function App() {
  const [initialPosition, setInitialPosition] = useState<Position | null>(null);

  const [screenBounds, setScreenBounds] = useState<ScreenBounds | null>(null);

  const [groundY, setGroundY] = useState<number | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        const usableArea = await getUsableArea();
        const calculatedGroundY = await getGroundY();

        const position = await setInitialPetPosition();

        setScreenBounds(usableArea);
        setGroundY(calculatedGroundY);
        setInitialPosition(position);
      } catch (error: unknown) {
        console.error('[APP] failed to initialize character', error);
      }
    };

    void initialize();
  }, []);

  if (initialPosition === null || screenBounds === null || groundY === null) {
    return null;
  }

  return (
    <CharacterApp
      initialPosition={initialPosition}
      screenBounds={screenBounds}
      groundY={groundY}
    />
  );
}

export default App;
