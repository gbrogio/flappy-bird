import type { tBirdProps } from './tBird';

export type tPipesPair = {
  x: number;
  y: number;
  gap: number;
  pipeSky?: {
    x: number;
    y: number;
  };
  pipeGround?: {
    x: number;
    y: number;
  };
};

export type tPipes = {
  width: number;
  height: number;
  gapPairs: number;
  pairs: tPipesPair[];
  ground: {
    spriteX: number;
    spriteY: number;
  };
  sky: {
    spriteX: number;
    spriteY: number;
  };
  draw: () => void;
  hasCollisionWithBird: (pair: tPipesPair, birds: tBirdProps[]) => void;
  update: (birds: tBirdProps[]) => void;
};
