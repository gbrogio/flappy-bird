import { type tBackground, type tGround } from '../../../types/tGame';
import { type tMakeFunctions } from '../../../types/tMakeFunctions';

export const makeBackground: tMakeFunctions<tBackground, []> = (
  ctx,
  Canvas,
  Sprites,
) => {
  const background: tBackground = {
    spriteX: 390,
    spriteY: 0,
    width: 275,
    height: 204,
    x: 0,
    y: Canvas.height - 204,
    draw() {
      ctx.fillStyle = '#70c5ce';
      ctx.fillRect(0, 0, Canvas.width, Canvas.height);

      ctx.drawImage(
        Sprites,
        background.spriteX,
        background.spriteY,
        background.width,
        background.height,
        background.x,
        background.y,
        background.width,
        background.height,
      );

      ctx.drawImage(
        Sprites,
        background.spriteX,
        background.spriteY,
        background.width,
        background.height,
        background.x + background.width,
        background.y,
        background.width,
        background.height,
      );
    },
  };
  return background;
};
export const makeGround: tMakeFunctions<tGround, []> = (
  ctx,
  Canvas,
  Sprites,
) => {
  const ground: tGround = {
    spriteX: 0,
    spriteY: 610,
    width: 224,
    height: 112,
    x: 0,
    y: Canvas.height - 112,
    update() {
      const velocity = 1;
      const repeat = ground.width / 2;
      const move = ground.x - velocity;

      ground.x = move % repeat;
    },
    draw() {
      ctx.drawImage(
        Sprites,
        ground.spriteX,
        ground.spriteY,
        ground.width,
        ground.height,
        ground.x,
        ground.y,
        ground.width,
        ground.height,
      );

      ctx.drawImage(
        Sprites,
        ground.spriteX,
        ground.spriteY,
        ground.width,
        ground.height,
        ground.x + ground.width,
        ground.y,
        ground.width,
        ground.height,
      );
    },
  };
  return ground;
};
