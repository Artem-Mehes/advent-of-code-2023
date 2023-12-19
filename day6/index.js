import fs from "fs";

const strings = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split(/\r?\n/)
  .filter(Boolean);

const races = strings.map((str) => [str.match(/\d+/g).join("")]);

console.log(races);

const beats = [];

for (let i = 0; i < races[0].length; i++) {
  const time = races[0][i];
  const distance = races[1][i];
  let beatTheRecordTimes = 0;

  for (let j = 1; j < time - 1; j++) {
    const diff = time - j;
    const res = diff * j;

    if (res > distance) beatTheRecordTimes++;
  }

  if (beatTheRecordTimes) beats.push(beatTheRecordTimes);
}

console.log(beats.reduce((a, b) => a * b));
