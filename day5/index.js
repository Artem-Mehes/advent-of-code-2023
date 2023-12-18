import fs from "fs";

const strings = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split(/\r?\n/)
  .filter(Boolean);

const seeds = strings[0].match(/\d+/g);

const maps = {};

for (let i = 1; i < strings.length; i++) {
  const current = strings[i];

  if (isNaN(current[0])) {
    maps[current] = [];

    let currentInd = i + 1;

    while (!isNaN(strings[currentInd]?.[0])) {
      maps[current].push(strings[currentInd]);
      currentInd += 1;
    }

    i += maps[current].length;
  }
}

function getMapNum(map, num) {
  for (let i = 0; i < map.length; i++) {
    const [mapSoil, mapSeed, mapLength] = map[i].match(/\d+/g).map(Number);

    if (mapSeed <= num && mapSeed + mapLength - 1 >= num) {
      const numToAdd = num - mapSeed;

      return mapSoil + numToAdd;
    }
  }

  return num;
}

let locations = [];

for (let i = 0; i < seeds.length; i++) {
  const currentSeed = +seeds[i];

  const location = Object.values(maps).reduce((num, map) => {
    return getMapNum(map, num);
  }, currentSeed);

  locations.push(location);
}

console.log("result", Math.min(...locations));
