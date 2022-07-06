import type { tPipes } from '../../../types/tPipes';
import type { tMakeFunctions } from '../../../types/tMakeFunctions';
import { BirdActions, frames } from '..';

export const makePipes: tMakeFunctions<tPipes, []> = (ctx, Canvas, Sprites) => {
  const pipes: tPipes = {
    width: 52,
    height: 400,
    gapPairs: 90,
    pairs: [],
    ground: {
      spriteX: 0,
      spriteY: 169,
    },
    sky: {
      spriteX: 52,
      spriteY: 169,
    },
    draw() {
      pipes.pairs.forEach((pair) => {
        const yRandom = pair.y;
        const pipesGap = pair.gap;

        const pipeSkyX = pair.x;
        const pipeSkyY = yRandom;

        // [Cano do Céu]
        ctx.drawImage(
          Sprites,
          pipes.sky.spriteX,
          pipes.sky.spriteY,
          pipes.width,
          pipes.height,
          pipeSkyX,
          pipeSkyY,
          pipes.width,
          pipes.height,
        );

        // [Cano do Chão]
        const pipesGroundX = pair.x;
        const pipesGroundY = pipes.height + pipesGap + yRandom;
        ctx.drawImage(
          Sprites,
          pipes.ground.spriteX,
          pipes.ground.spriteY,
          pipes.width,
          pipes.height,
          pipesGroundX,
          pipesGroundY,
          pipes.width,
          pipes.height,
        );

        pair.pipeSky = {
          x: pipeSkyX,
          y: pipes.height + pipeSkyY,
        };
        pair.pipeGround = {
          x: pipesGroundX,
          y: pipesGroundY,
        };
      });
    },
    hasCollisionWithBird(pair, birds) {
      birds.map((bird) => {
        const BirdHead = bird.y;
        const BirdFoot = bird.y + bird.height;

        if (bird.x + bird.width >= pair.x) {
          if (BirdHead <= pair.pipeSky.y) {
            BirdActions.kill(bird);
          }

          if (BirdFoot >= pair.pipeGround.y) {
            BirdActions.kill(bird);
          }
        }
        return bird;
      });
    },
    update(birds) {
      const pass100frames = frames() % 100 === 0;
      if (pass100frames) {
        pipes.pairs.push({
          x: Canvas.width,
          y: -150 * (Math.random() + 1),
          gap: pipes.gapPairs,
        });
      }

      pipes.pairs.forEach((pair) => {
        pair.x -= 2;

        pipes.hasCollisionWithBird(pair, birds);

        if (pair.x + pipes.width <= 0) {
          pipes.pairs.shift();
        }
      });
    },
  };

  return pipes;
};
