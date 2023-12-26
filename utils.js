const fs = require("fs").promises;

async function inputReader(path) {
  try {
    return await fs.readFile(path, { encoding: "utf8" });
  } catch (err) {
    console.log(err);
  }
}

function rawToArray(string) {
  const arrayData = string.split("\n");
  arrayData.pop();
  return arrayData;
}

module.exports = { inputReader, rawToArray };
