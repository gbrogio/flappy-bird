export type tMakeFunctions<T, U extends Array<any>> = (
  ctx: CanvasRenderingContext2D,
  Canvas: HTMLCanvasElement | undefined,
  Sprites: HTMLImageElement,
  ...rest: U
) => T;
