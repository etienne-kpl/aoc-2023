const inputReader = require("../utils").inputReader;
const rawToArray = require("../utils").rawToArray;

inputReader("input.txt").then((data) => {
  const arrayData = rawToArray(data);

  const cards = arrayData.map((row) => {
    const numbers = row.split(":")[1].split("|");
    return {
      copies: 1,
      winning: numbers[0].split(" ").filter((a) => a),
      having: numbers[1].split(" ").filter((a) => a),
    };
  });

  const numbersPerCard = cards[0].winning.length + cards[0].having.length;

  // Count number of duplicate in each card
  const matchNumbers = cards.map((card) => {
    const allNumbers = card.winning.concat(card.having);
    const lengthWithoutDuplicates = allNumbers.filter(
      (item, index) => allNumbers.indexOf(item) === index
    ).length;
    return numbersPerCard - lengthWithoutDuplicates;
  });

  // Count points for each card
  const points = matchNumbers.map((number) =>
    number === 0 ? 0 : Math.pow(2, number - 1)
  );

  // part 2
  let totalCopies = 0;
  matchNumbers.forEach((number, index) => {
    for (let i = 0; i < number; i++)
      cards[index + 1 + i].copies += cards[index].copies;
    totalCopies += cards[index].copies;
  });

  const sum = points.reduce((a, b) => a + b);
  console.log(sum, totalCopies);
});
