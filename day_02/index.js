const inputReader = require("../utils").inputReader;
const rawToArray = require("../utils").rawToArray;

const limits = {
  red: 12,
  green: 13,
  blue: 14,
};

function dataParser(rawData) {
  const games = rawData.map((row) => row.split(": ")[1]);
  const sets = games.map((game) => game.split("; "));

  const parsedData = sets.map((set) => {
    const values = set.map((cubes) => {
      const object = {};
      cubes.split(", ").forEach((cube) => {
        const array = cube.split(" ");
        object[array[1]] = parseInt(array[0]);
      });
      return object;
    });
    return values;
  });
  return parsedData;
}

// Part one
inputReader("input.txt").then((data) => {
  const arrayData = rawToArray(data);
  const parsedData = dataParser(arrayData);
  let indexCounter = 0;

  parsedData.forEach((game, index) => {
    if (
      !game.some(
        (set) =>
          set.red > limits.red ||
          set.green > limits.green ||
          set.blue > limits.blue
      )
    ) {
      indexCounter += index + 1;
    }
  });
  console.log(indexCounter);
});

// Part two
inputReader("input.txt").then((data) => {
  const arrayData = rawToArray(data);
  const parsedData = dataParser(arrayData);

  const maxValues = parsedData.map((game) => {
    return {
      red: Math.max(...game.map((set) => set.red ?? 0)),
      green: Math.max(...game.map((set) => set.green ?? 0)),
      blue: Math.max(...game.map((set) => set.blue ?? 0)),
    };
  });

  const powers = maxValues.map((maxValue) =>
    Object.values(maxValue).reduce((a, b) => a * b)
  );

  const sumOfPowers = powers.reduce((a, b) => a + b);
  console.log(sumOfPowers);
});
