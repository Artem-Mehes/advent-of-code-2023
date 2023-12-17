import fs from "fs";

const items = fs.readFileSync("./input.txt", "utf-8").trim().split(/\r?\n/);

let result = 0;

items.forEach((current) => {
  const idMatch = current.match(/Game (\d+)/);
  const id = +idMatch[1];

  console.log("----------------------");
  console.log(current);

  const sets = current.split("; ");

  const maxValues = {
    red: 0,
    green: 0,
    blue: 0,
  };

  sets.forEach((set) => {
    const matches = [...set.matchAll(/(\d+) (green|blue|red)/g)];

    const setDetails = matches.reduce((result, current) => {
      result[current[2]] = +current[1];
      return result;
    }, {});

    Object.entries(setDetails).forEach(([color, value]) => {
      if (maxValues[color] < value) {
        maxValues[color] = value;
      }
    });
  });

  result += Object.values(maxValues).reduce((sum, current) => sum * current);
});

console.log(result);
