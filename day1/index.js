import fs from "fs";

const items = fs.readFileSync("./input.txt", "utf-8").trim().split(/\r?\n/);

let result = 0;

const wordToNumberMap = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const numWords = Object.keys(wordToNumberMap);

items.forEach((currentString) => {
  const wordsMatches = numWords
    .map((word) => {
      const regex = new RegExp(word, "gi");
      const matches = currentString.matchAll(regex);

      return [...matches];
    })
    .flat()
    .sort((a, b) => a.index - b.index);

  const firstMatch = wordsMatches[0];
  const lastMatch = wordsMatches.at(-1);
  console.log("------------------------------");

  console.log(currentString);

  const firstRealNumberIndex = currentString
    .split("")
    .findIndex((value) => Number.isInteger(+value));

  let lastRealNumberIndex = currentString
    .split("")
    .findLastIndex((value) => Number.isInteger(+value));

  let resultFirstNumber;

  if (firstRealNumberIndex > -1) {
    if (firstMatch && firstMatch.index < firstRealNumberIndex) {
      resultFirstNumber = wordToNumberMap[firstMatch[0]];
    } else {
      resultFirstNumber = currentString[firstRealNumberIndex];

      // if (lastRealNumberIndex === firstRealNumberIndex) {
      //   lastRealNumberIndex = -1;
      // }
    }
  } else if (firstMatch) {
    resultFirstNumber = wordToNumberMap[firstMatch[0]];
  }

  let resultLastNumber;

  if (lastRealNumberIndex > -1) {
    if (lastMatch && lastMatch.index > lastRealNumberIndex) {
      resultLastNumber = wordToNumberMap[lastMatch[0]];
    } else {
      resultLastNumber = currentString[lastRealNumberIndex];
    }
  } else if (lastMatch) {
    resultLastNumber = wordToNumberMap[lastMatch[0]];
  }

  console.log("resultFirstNumber", resultFirstNumber);
  console.log("resultLastNumber", resultLastNumber);
  console.log(
    "current sum",
    Number(resultFirstNumber + (resultLastNumber ? resultLastNumber : "")),
  );

  result += Number(
    resultFirstNumber + (resultLastNumber ? resultLastNumber : ""),
  );
});

// (such as 'twone' and 'eightwo')

console.log("final result", result);

// last threeone37
