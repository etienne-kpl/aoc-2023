const fs = require("fs").promises;

const lettersDigits = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

async function partOne() {
  try {
    const rawData = await fs.readFile("input.txt", { encoding: "utf8" });
    const parsedData = rawData.split("\n");
    parsedData.pop();
    const regex = /[0-9]/g;

    const numbersArray = parsedData.map((el) => el.match(regex));

    const resultArray = numbersArray.map((el) =>
      parseInt(el[0] + el[el.length - 1])
    );

    const sum = resultArray.reduce(function (a, b) {
      return a + b;
    });

    console.log(sum);
  } catch (err) {
    console.log(err);
  }
}

partOne();
