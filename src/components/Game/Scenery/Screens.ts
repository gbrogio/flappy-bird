import type { tCurrentScreen } from '../../../types/tGame';

import { Setter } from '../../../utils/MakeSetter';
import { getOutputs } from '../../Network';

import { makeBird } from '../Bird';
import { makePipes } from '../Pipe';
import { makeGround } from '.';
import {
  ctx,
  Canvas,
  Globals,
  Sprites,
  messageGetReady,
  messageGameOver,
  background,
  BirdActions,
} from '..';

export const [currentScreen, setCurrentScreen] = Setter<tCurrentScreen>(
  {} as tCurrentScreen,
);

const members = 1000;
const train = false;
let gen = 0;
let nBetterBird: any;

export const SCREENS = {
  INDEX: {
    start() {
      Globals.FakeBird = makeBird(ctx, Canvas, Sprites, undefined).BirdProps;
      Globals.pipes = makePipes(ctx, Canvas, Sprites);
      Globals.ground = makeGround(ctx, Canvas, Sprites);
      Globals.points = 0;
      gen += 1;
      if (train) {
        currentScreen().click();
      }
    },
    draw() {
      background.draw();
      BirdActions.draw(Globals.FakeBird);

      Globals.ground.draw();
      messageGetReady.draw();
    },
    click() {
      setCurrentScreen(SCREENS.GAME);
      currentScreen().start();
    },
    update() {
      Globals.ground.update();
    },
  },
  GAME: {
    start() {
      Globals.FakeBird = undefined;
      if (gen >= 2) {
        let currBetterBird = Globals.birds[0];
        for (let i = 0; i < Globals.birds.length; i++) {
          if (Globals.birds[i].points > currBetterBird.points) {
            currBetterBird = Globals.birds[i];
          }
        }

        nBetterBird = () =>
          currBetterBird
            ? [currBetterBird.brain(), { points: currBetterBird.points }]
            : undefined;
      }

      Globals.birds = [];
      console.log(nBetterBird && nBetterBird()[1].points > 194);

      for (let i = 0; i < (train ? members : 2); i++) {
        Globals.birds.push(
          makeBird(
            ctx,
            Canvas,
            Sprites,
            nBetterBird && nBetterBird()[1].points > 194 && nBetterBird()[0],
          ).BirdProps,
        );
        Globals.birds[i].die = false;
      }
    },
    draw() {
      background.draw();
      Globals.pipes.draw();
      Globals.ground.draw();
      Globals.birds.map((bird) => BirdActions.draw(bird));
      Globals.points.draw();
    },
    click() {
      return !train && BirdActions.jump(Globals.birds[1]);
    },
    update() {
      Globals.points += 1;

      const currPair =
        Globals.pipes.pairs[0]?.x >= 15
          ? Globals.pipes.pairs[0]
          : Globals.pipes.pairs[1] || undefined;

      Globals.pipes.update(Globals.birds.filter((bird) => bird.die === false));
      Globals.ground.update();
      Globals.birds.map((bird, i) => {
        if (bird.die === false) {
          BirdActions.update(bird);
          const currBrain = bird.brain();
          const vision = bird.vision(bird, currPair);
          const inputs = [
            vision.birdTilGround,
            vision.birdTilPipe,
            vision.pipeGap - 60,
          ];
          const outputs = getOutputs(
            inputs,
            currBrain.numberOfOutputs,
            currBrain,
          );

          if (outputs[0] < 0.15) {
            if (!train && i === 0) {
              BirdActions.jump(bird);
            } else if (train) {
              BirdActions.jump(bird);
            }
          }
          bird.points += 1;
        }
        return bird;
      });

      const numberOfDies = Globals.birds.filter((bird) => bird.die === true);
      if (numberOfDies.length >= (train ? members : 2)) {
        setCurrentScreen(SCREENS.GAME_OVER);
        currentScreen().start();
      }
    },
  },
  GAME_OVER: {
    draw() {
      messageGameOver.desenha();
    },
    update() {
      // Do Something
    },
    click() {
      setCurrentScreen(SCREENS.INDEX);
      currentScreen().start();
    },
    start() {
      if (train) {
        currentScreen().click();
      }
    },
  },
};
