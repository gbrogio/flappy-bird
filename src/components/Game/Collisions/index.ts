import type { tGround } from '../../../types/tGame';
import type { tBirdProps } from '../../../types/tBird';

export function makeCollisionGround(bird: tBirdProps, ground: tGround) {
  const birdY = bird.y + bird.height;
  const groundY = ground.y;

  if (birdY >= groundY) {
    return true;
  }

  return false;
}
