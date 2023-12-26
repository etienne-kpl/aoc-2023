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
      cubes.split(", ").map((cube) => {
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
