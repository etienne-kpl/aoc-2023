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
      (symbolIndex) =>
        symbolIndex.index >= location.index - 1 &&
        symbolIndex.index <= location.index + location.value.length
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
