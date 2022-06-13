const LEVEL_TO_PROBABILITY = {
  EASY: [70, 25, 5],
  MEDIUM: [25, 50, 25],
  HARD: [10, 25, 65],
};

const RANGES = [
  { min: 50, max: 100 },
  { min: 100, max: 150 },
  { min: 150, max: 400 },
];

const generateSumArray = (probabilities) => {
  const sum = probabilities.reduce((acc, curr, i) => {
    if (i === 0) {
      acc.push(curr);
    } else {
      acc.push(acc[i - 1] + curr);
    }
    return acc;
  }, []);
  return sum;
};

const SUM_ARRAYS = {
  easy: generateSumArray(LEVEL_TO_PROBABILITY.EASY),
  medium: generateSumArray(LEVEL_TO_PROBABILITY.MEDIUM),
  hard: generateSumArray(LEVEL_TO_PROBABILITY.HARD),
};

const roundDownToNearest10 = (num) => {
  return Math.floor(num / 10) * 10;
};

const generateScoreByLevel = (level) => {
  const sumArray = SUM_ARRAYS[level.toLowerCase()];
  const random = Math.floor(Math.random() * sumArray[sumArray.length - 1]);
  let i = 0;
  while (i < sumArray.length && random > sumArray[i]) {
    i++;
  }
  return roundDownToNearest10(
    RANGES[i].min + Math.floor(Math.random() * (RANGES[i].max - RANGES[i].min))
  );
};

module.exports = {
  generateScoreByLevel,
};
