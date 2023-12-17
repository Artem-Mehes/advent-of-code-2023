import fs from "fs";

const strings = fs.readFileSync("./input.txt", "utf-8").trim().split(/\r?\n/);

let result = 0;

const regEx = /\d+/g;

const copiesIndexes = [];

for (let i = 0; i < strings.length; i++) {
  const current = strings[i];

  const [, cards] = current.split(": ");
  const board = cards.split(" | ");

  const winningNumbers = board[0].match(regEx).map(Number);
  const yourNumbers = board[1].match(regEx).map(Number);

  const yourWinningNumbers = yourNumbers.filter((num) =>
    winningNumbers.includes(num),
  );

  result += 1;

  if (yourWinningNumbers.length) {
    const copiesItems = Array.from(
      { length: yourWinningNumbers.length },
      (_, index) => index + i + 1,
    );

    copiesIndexes.push(...copiesItems);

    if (copiesIndexes.includes(i)) {
      const count = copiesIndexes.filter((index) => index === i).length;

      for (let i = count; i > 0; i--) {
        copiesIndexes.push(...copiesItems);
      }
    }

    console.log("copiesIndexes", copiesIndexes);
  }
}

console.log("result", result + copiesIndexes.length);
