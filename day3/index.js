import fs from "fs";

const items = fs.readFileSync("./input.txt", "utf-8").trim().split(/\r?\n/);

let result = 0;

const numberRegEx = /(\d+)/;

function isNumber(value) {
  return numberRegEx.test(value);
}

function extractNum(string, sliceStart, sliceEnd) {
  const slice = string.slice(sliceStart, sliceEnd);
  const matches = [...slice.matchAll(/(\d+)/g)];

  let firstMatch;
  let secondMatch;
  let result = [];

  const prevChar = sliceStart > 0 ? string[sliceStart - 1] : undefined;
  const nextChar = string[sliceEnd];

  if (matches.length) {
    matches.forEach((match) => {
      const length = match[0].length;
      const index = match.index;

      if (length + index >= 3 && index < 5) {
        result.push(match[0]);
      }
    });
  }

  return result;
}

items.forEach((current, index) => {
  const gears = [...current.matchAll(/[*]/g)];

  const prevString = index > 0 ? items[index - 1] : undefined;
  const nextString = index === items.length - 1 ? undefined : items[index + 1];

  gears.forEach((match) => {
    const nums = [];

    const gearMatchIndex = match.index;

    if (isNumber(current[gearMatchIndex - 1])) {
      let currentIndex = gearMatchIndex - 1;
      let num = "";

      while (isNumber(current[currentIndex])) {
        num = current[currentIndex] + num;
        currentIndex -= 1;
      }

      nums.push(num);
    }

    if (numberRegEx.test(current[gearMatchIndex + 1])) {
      let currentIndex = gearMatchIndex + 1;

      let num = "";

      console.log(isNumber(current[currentIndex]));

      while (isNumber(current[currentIndex])) {
        console.log(1);
        console.log(current[currentIndex]);
        num = num + current[currentIndex];
        currentIndex += 1;
      }

      nums.push(num);
    }

    const sliceStart = gearMatchIndex - 3 < 0 ? 0 : gearMatchIndex - 3;
    const sliceEnd = sliceStart + 7;

    if (prevString) {
      const prevStringMatches = extractNum(prevString, sliceStart, sliceEnd);

      if (prevStringMatches.length) nums.push(...prevStringMatches);
    }

    if (nextString) {
      const nextStringMatches = extractNum(nextString, sliceStart, sliceEnd);
      if (nextStringMatches.length) nums.push(...nextStringMatches);
    }

    console.log(nums.filter(Boolean));

    if (nums.filter(Boolean).length === 2) {
      result += +nums[0] * +nums[1];
    }
  });
});

console.log(result);
