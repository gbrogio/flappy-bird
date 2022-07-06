import { MakeBrain } from '../components/Network';
import type { tBirdProps } from './tBird';
import type { tPipes } from './tPipes';

const brain = MakeBrain(1, 2, 3, 0);

type tEntities = {
  spriteX: number;
  spriteY: number;
  width: number;
  height: number;
  x: number;
  y: number;
  draw: () => void;
};

export type tCurrentScreen = {
  start?: () => void;
  draw: () => void;
  click: () => void;
  update: () => void;
};

export type tBackground = tEntities;

export type tGround = {
  update: () => void;
} & tEntities;

export type tGlobals = {
  birds: tBirdProps[];
  betterBird: [typeof brain, { points: number }];
  pipes: tPipes;
  ground: tGround;
  points: number;
  FakeBird: tBirdProps | undefined;
};
