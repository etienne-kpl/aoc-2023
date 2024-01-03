const inputReader = require("../utils").inputReader;
const rawToArray = require("../utils").rawToArray;

function symbolsLocationsFinder(array) {
  const regex = /[^0-9.]/g;
  // Find all matches at each row and return their index
  // Element type [ '*', index: 3, input: '...*......', groups: undefined ]
  return array.map((row) =>
    [...row.matchAll(regex)].map((el) => {
      return { value: el[0], index: el.index };
    })
  );
}

function numbersLocationsFinder(array) {
  const regex = /[0-9]+/g;
  return array.map((row) =>
    [...row.matchAll(regex)].map((el) => {
      return {
        value: el[0],
        index: el.index,
      };
    })
  );
}

// Part one
inputReader("input.txt").then((data) => {
  const arrayData = rawToArray(data);

  const symbolsLocations = symbolsLocationsFinder(arrayData);
  const numbersLocations = numbersLocationsFinder(arrayData);
  const partNumbers = [];

  const isLocationAdjacentToSymbol = (location, index) => {
    // For first and last lines
    if (index < 0 || index >= numbersLocations.length) return false;

    return symbolsLocations[index].some(
      (symbol) =>
        symbol.index >= location.index - 1 &&
        symbol.index <= location.index + location.value.length
    );
  };

  // Compare each line only with previous, current and next lines
  numbersLocations.forEach((row, index) => {
    row.forEach((location) => {
      if (
        isLocationAdjacentToSymbol(location, index - 1) ||
        isLocationAdjacentToSymbol(location, index) ||
        isLocationAdjacentToSymbol(location, index + 1)
      ) {
        partNumbers.push(parseInt(location.value));
      }
    });
  });
  const sum = partNumbers.reduce((a, b) => a + b);
  console.log(sum);
});

// Part two
inputReader("input.txt").then((data) => {
  const arrayData = rawToArray(data);

  const symbolsLocations = symbolsLocationsFinder(arrayData);
  const numbersLocations = numbersLocationsFinder(arrayData);
  const potentialGears = symbolsLocations.map((row) =>
    row.filter((symbol) => symbol.value === "*")
  );
  const gearsRatios = [];

  const NumbersAdjacentToGear = (gear, index) => {
    // For first and last lines
    if (index < 0 || index >= numbersLocations.length) return [];

    return numbersLocations[index].filter(
      (number) =>
        gear.index >= number.index - 1 &&
        gear.index <= number.index + number.value.length
    );
  };

  potentialGears.forEach((row, index) => {
    row.forEach((gear) => {
      const adjacentNumbers = [
        ...NumbersAdjacentToGear(gear, index - 1),
        ...NumbersAdjacentToGear(gear, index),
        ...NumbersAdjacentToGear(gear, index + 1),
      ];
      if (adjacentNumbers.length === 2) {
        gearsRatios.push(adjacentNumbers[0].value * adjacentNumbers[1].value);
      }
    });
  });

  const sum = gearsRatios.reduce((a, b) => a + b);

  console.log(sum);
});
