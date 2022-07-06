export type tBrain = {
  inputs: Array<number>;
  weightsInputsToHiddenNodes: Array<Array<number>>;
  biasesHiddenNodes: Array<number>;
  weightsHiddenNodesToOutputs: Array<Array<number>>;
  biasesOutputs: Array<number>;
  outputs: Array<number>;
  learnRange: number;
  numberOfHiddenNodes: number;
  numberOfOutputs: number;
};
