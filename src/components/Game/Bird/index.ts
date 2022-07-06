import type { tBirdActions, tBirdProps } from '../../../types/tBird';
import type { tMakeFunctions } from '../../../types/tMakeFunctions';

import { MakeBrain } from '../../Network';
import { makeCollisionGround } from '../Collisions';
import { frames, Globals } from '..';

export const makeBird: tMakeFunctions<
  { BirdProps: tBirdProps; BirdActions: tBirdActions },
  [any | undefined]
> = (ctx, Screen, Sprites, betterBird) => {
  const BirdProps: tBirdProps = {
    die: false,
    width: 33,
    height: 24,
    x: 10,
    y: 50,
    jumpSize: 4.6,
    gravity: 0.25,
    velocity: 0,
    currentFrame: 0,
    points: 0,
    moves: [
      { spriteX: 0, spriteY: 0 },
      { spriteX: 0, spriteY: 26 },
      { spriteX: 0, spriteY: 52 },
      { spriteX: 0, spriteY: 26 },
    ],
    brain() {
      return {
        ...MakeBrain(3, 6, 1, 1, betterBird),
      };
    },
    vision(bird, pair) {
      return pair
        ? {
            birdTilGround: bird.y + bird.height,
            birdTilPipe: (bird.x + bird.width - pair.x) * -1,
            pipeGap: pair.gap,
          }
        : {
            birdTilGround: bird.y + bird.height,
            birdTilPipe: (bird.x + bird.width - Screen.width) * -1,
            pipeGap: 90,
          };
    },
  };
  const BirdActions: tBirdActions = {
    jump(bird) {
      bird.velocity = -bird.jumpSize;
    },
    update(bird) {
      if (makeCollisionGround(bird, Globals.ground)) {
        BirdActions.kill(bird);
        return;
      }

      bird.velocity += bird.gravity;
      bird.y += bird.velocity;
    },
    updateCurrentFrame(bird) {
      const rangeOfFrames = 10;
      const passRange = frames() % rangeOfFrames === 0;

      if (passRange) {
        const incrementBase = 1;
        const repeatBase = bird.moves.length;
        const increment = incrementBase + bird.currentFrame;
        bird.currentFrame = increment % repeatBase;
      }
    },
    draw(bird) {
      BirdActions.updateCurrentFrame(bird);
      const { spriteX, spriteY } = bird.moves[bird.die ? 0 : bird.currentFrame];

      ctx.drawImage(
        Sprites,
        spriteX,
        spriteY, // Sprite X, Sprite Y
        bird.width,
        bird.height, // Tamanho do recorte na sprite
        bird.x,
        bird.y,
        bird.width,
        bird.height,
      );
    },
    kill(bird) {
      bird.die = true;
      bird.width = 0;
      bird.height = 0;
      bird.gravity = 0;
      bird.velocity = 0;
      bird.jumpSize = 0;
      bird.points -= 4;
    },
  };
  return {
    BirdProps,
    BirdActions,
  };
};
