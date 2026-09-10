import { useEffect, useRef } from 'react';

export function useGameLoop(callback: (deltaTime: number) => void): void {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    let animationFrameId = 0;
    let previousTime: number | null = null;

    const loop = (currentTime: number) => {
      if (previousTime === null) {
        previousTime = currentTime;
      }

      const deltaTime = (currentTime - previousTime) / 1000;

      previousTime = currentTime;

      callbackRef.current(deltaTime);

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
}
