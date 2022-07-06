import { tBrain } from '../../types/tBrain';
import { getRandomNumberBetween } from '../../utils/Math/random';

export function mutate(
  Brain: tBrain,
  range: number,
): {
  weightsInputsToHiddenNodesMutated: tBrain['weightsInputsToHiddenNodes'];
  biasesHiddenNodesMutated: tBrain['biasesHiddenNodes'];
  weightsHiddenNodesToOutputsMutated: tBrain['weightsHiddenNodesToOutputs'];
  biasesOutputsMutated: tBrain['biasesOutputs'];
} {
  let biasesHiddenNodesMutated: tBrain['biasesHiddenNodes'] = [];
  let biasesOutputsMutated: tBrain['biasesOutputs'] = [];
  let weightsInputsToHiddenNodesMutated: tBrain['weightsInputsToHiddenNodes'] =
    [];
  let weightsHiddenNodesToOutputsMutated: tBrain['weightsHiddenNodesToOutputs'] =
    [];

  biasesHiddenNodesMutated = Brain.biasesHiddenNodes.map((bias) => {
    return bias + getRandomNumberBetween(-range, range, false) * 0.01;
  });
  biasesOutputsMutated = Brain.biasesOutputs.map((bias) => {
    return bias + getRandomNumberBetween(-range, range, false) * 0.01;
  });
  weightsInputsToHiddenNodesMutated = Brain.weightsInputsToHiddenNodes.map(
    (weights) => {
      return weights.map(
        (weight) =>
          weight + getRandomNumberBetween(-range, range, false) * 0.01,
      );
    },
  );
  weightsHiddenNodesToOutputsMutated = Brain.weightsHiddenNodesToOutputs.map(
    (weights) => {
      return weights.map(
        (weight) =>
          weight + getRandomNumberBetween(-range, range, false) * 0.01,
      );
    },
  );

  return {
    weightsInputsToHiddenNodesMutated,
    biasesHiddenNodesMutated,
    weightsHiddenNodesToOutputsMutated,
    biasesOutputsMutated,
  };
}
