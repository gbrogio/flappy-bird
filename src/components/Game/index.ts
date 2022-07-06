import type { tGlobals } from '../../types/tGame';
import { MakeElement } from '../../utils/MakeElement';
import { Setter } from '../../utils/MakeSetter';

import { makeBird } from './Bird';
import { makeBackground } from './Scenery';
import { SCREENS, currentScreen, setCurrentScreen } from './Scenery/Screens';

/// //////// Utils //////// ///
export const [frames, setFrames] = Setter(0);

/// //////// Globals //////// ///
export const Globals: tGlobals = {} as tGlobals;
// const hasStarted = true;

/// //////// Images //////// ///
export const Sprites = new Image();
Sprites.src = 'assets/sprites.png';

/// //////// Canvas //////// ///
export const Canvas = MakeElement<HTMLCanvasElement>('canvas', 'canvas');
Canvas.width = 320;
Canvas.height = 480;
export const ctx = Canvas.getContext('2d')!;

/// //////// Components //////// ///
export const background = makeBackground(ctx, Canvas, Sprites);
export const { BirdActions } = makeBird(ctx, Canvas, Sprites, undefined);

/// //////// Message //////// ///
export const messageGetReady = {
  sX: 134,
  sY: 0,
  w: 174,
  h: 152,
  x: Canvas.width / 2 - 174 / 2,
  y: 50,
  draw() {
    ctx.drawImage(
      Sprites,
      messageGetReady.sX,
      messageGetReady.sY,
      messageGetReady.w,
      messageGetReady.h,
      messageGetReady.x,
      messageGetReady.y,
      messageGetReady.w,
      messageGetReady.h,
    );
  },
};
export const messageGameOver = {
  sX: 134,
  sY: 153,
  w: 226,
  h: 200,
  x: Canvas.width / 2 - 226 / 2,
  y: 50,
  desenha() {
    ctx.drawImage(
      Sprites,
      messageGameOver.sX,
      messageGameOver.sY,
      messageGameOver.w,
      messageGameOver.h,
      messageGameOver.x,
      messageGameOver.y,
      messageGameOver.w,
      messageGameOver.h,
    );
  },
};

/// //////// Game //////// ///
function loop() {
  currentScreen().draw();
  currentScreen().update();

  setFrames(frames() + 1);
  requestAnimationFrame(loop);
}

window.addEventListener(
  'click',
  () => currentScreen().click && currentScreen().click(),
);

setCurrentScreen(SCREENS.INDEX);
currentScreen().start();
loop();
export const Game = Canvas;
