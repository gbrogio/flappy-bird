import { MakeBrain } from '../components/Network';
import type { tPipesPair } from './tPipes';

const brain = MakeBrain(1, 2, 3, 0);

export type tBirdProps = {
  die: boolean;
  width: number;
  height: number;
  x: number;
  y: number;
  jumpSize: number;
  gravity: number;
  velocity: number;
  currentFrame: number;
  points: number;
  moves: [
    { spriteX: number; spriteY: number },
    { spriteX: number; spriteY: number },
    { spriteX: number; spriteY: number },
    { spriteX: number; spriteY: number },
  ];
  brain: () => typeof brain;
  vision: (
    bird: tBirdProps,
    pair?: tPipesPair | undefined,
  ) => {
    birdTilGround: number;
    birdTilPipe: number;
    pipeGap: number;
  };
};
export type tBirdActions = {
  jump: (bird: tBirdProps) => void;
  update: (bird: tBirdProps) => void;
  updateCurrentFrame: (bird: tBirdProps) => void;
  draw: (bird: tBirdProps) => void;
  kill: (bird: tBirdProps) => void;
};
