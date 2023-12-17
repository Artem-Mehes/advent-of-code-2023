import fs from "fs";

const strings = fs.readFileSync("./input.txt", "utf-8").trim().split(/\r?\n/);

let result = 0;

const regEx = /\d+/g;

for (let i = 0; i < strings.length; i++) {
  const current = strings[i];

  const [, cards] = current.split(": ");
  const board = cards.split(" | ");

  const winningNumbers = board[0].match(regEx).map(Number);
  const yourNumbers = board[1].match(regEx).map(Number);

  const yourWinningNumbers = yourNumbers.filter((num) =>
    winningNumbers.includes(num),
  );

  if (yourWinningNumbers.length) {
    result += Math.pow(2, yourWinningNumbers.length - 1);
  }
}
