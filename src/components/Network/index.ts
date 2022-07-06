import { type tBrain } from '../../types/tBrain';
import { getRandomNumberBetween } from '../../utils/Math/random';
import { mutate } from './mutate';

function activation(x: number): number {
  // return Math.tanh(x);
  return 1 / (1 + Math.exp(-x));
}

export function MakeBrain(
  numberOfInputs: number,
  numberOfHiddenNodes: number,
  numberOfOutputs: number,
  learnRange: number,
  betterBrain?: any,
) {
  let biasesHiddenNodes: tBrain['biasesHiddenNodes'] = [];
  let biasesOutputs: tBrain['biasesOutputs'] = [];
  let weightsInputsToHiddenNodes: tBrain['weightsInputsToHiddenNodes'] = [];
  let weightsHiddenNodesToOutputs: tBrain['weightsHiddenNodesToOutputs'] = [];

  if (!betterBrain) {
    for (let i = 0; i < numberOfInputs; i++) {
      for (let j = 0; j < numberOfHiddenNodes; j++) {
        weightsInputsToHiddenNodes[i] = weightsInputsToHiddenNodes[i]
          ? [
              ...weightsInputsToHiddenNodes[i],
              getRandomNumberBetween(-1, 1, false),
            ]
          : [getRandomNumberBetween(-1, 1, false)];
        biasesHiddenNodes.push(getRandomNumberBetween(-1, 1, false));
      }
    }
    for (let i = 0; i < numberOfOutputs; i++) {
      biasesOutputs.push(getRandomNumberBetween(-1, 1, false));
      for (let j = 0; j < numberOfHiddenNodes; j++) {
        weightsHiddenNodesToOutputs[i] = weightsHiddenNodesToOutputs[i]
          ? [
              ...weightsHiddenNodesToOutputs[i],
              getRandomNumberBetween(-1, 1, false),
            ]
          : [getRandomNumberBetween(-1, 1, false)];
      }
    }
  } else {
    const {
      weightsInputsToHiddenNodesMutated,
      biasesHiddenNodesMutated,
      weightsHiddenNodesToOutputsMutated,
      biasesOutputsMutated,
    } = mutate(betterBrain, learnRange);
    biasesHiddenNodes = biasesHiddenNodesMutated;
    biasesOutputs = biasesOutputsMutated;
    weightsInputsToHiddenNodes = weightsInputsToHiddenNodesMutated;
    weightsHiddenNodesToOutputs = weightsHiddenNodesToOutputsMutated;
  }

  return {
    weightsInputsToHiddenNodes,
    biasesHiddenNodes,
    weightsHiddenNodesToOutputs,
    biasesOutputs,
    learnRange,
    numberOfHiddenNodes,
    numberOfOutputs,
  };
}
const brain = MakeBrain(1, 2, 3, 0);

export function getOutputs(
  inputs: tBrain['inputs'],
  numberOfOutputs: number,
  currBrain: typeof brain,
) {
  const { biasesHiddenNodes } = currBrain;
  const { biasesOutputs } = currBrain;
  const { weightsInputsToHiddenNodes } = currBrain;
  const { weightsHiddenNodesToOutputs } = currBrain;
  let hiddenNodes: number[] = [];
  let outputs: tBrain['outputs'] = [];

  for (let i = 0; i < inputs.length; i++) {
    const inputsWeighted = inputs.map((input, j) => {
      return input * weightsInputsToHiddenNodes[i][j];
    });
    hiddenNodes = biasesHiddenNodes.map((bias) => {
      return activation(bias + inputsWeighted.reduce((a, b) => a + b));
    });
  }
  for (let i = 0; i < numberOfOutputs; i++) {
    const hiddenNodesWeighted = hiddenNodes.map((hiddenNode) => {
      return (
        hiddenNode * weightsHiddenNodesToOutputs[i].reduce((a, b) => a + b)
      );
    });
    outputs = biasesOutputs.map((bias) => {
      return activation(bias + hiddenNodesWeighted.reduce((a, b) => a + b));
    });
  }

  return outputs;
}
