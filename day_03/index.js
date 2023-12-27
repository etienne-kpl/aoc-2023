const inputReader = require("../utils").inputReader;
const rawToArray = require("../utils").rawToArray;

function symbolsLocationsFinder(array) {
  const regex = /[^0-9.]/g;
  // Find all matches at each row and return their index
  // Element type [ '*', index: 3, input: '...*......', groups: undefined ]
  return array.map((row) => [...row.matchAll(regex)].map((el) => el.index));
}

function numbersLocationsFinder(array) {
  const regex = /[0-9]+/g;
  return array.map((row) =>
    [...row.matchAll(regex)].map((el) => {
      return {
        value: parseInt(el[0]),
        startIndex: el.index,
        endIndex: el.index + el[0].length - 1,
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
    if (index < 0 || index >= numbersLocations.length) return false;

    return symbolsLocations[index].some(
      (symbolIndex) =>
        symbolIndex >= location.startIndex - 1 &&
        symbolIndex <= location.endIndex + 1
    );
  };

  // Compare each line only with previous, current and next lines
  numbersLocations.forEach((row, index) => {
    row.forEach((location) => {
      if (
        isLocationAdjacentToSymbol(location, index) ||
        isLocationAdjacentToSymbol(location, index - 1) ||
        isLocationAdjacentToSymbol(location, index + 1)
      ) {
        partNumbers.push(location.value);
      }
    });
  });
  const sum = partNumbers.reduce((a, b) => a + b);
  console.log(sum);
});
