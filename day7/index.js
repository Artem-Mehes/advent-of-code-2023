import fs from "fs";

const strings = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split(/\r?\n/)
  .filter(Boolean);

const strengthOrder = [
  "A",
  "K",
  "Q",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "J",
];

const items = strings.map((item) => item.split(" "));

const sorted = {
  highCard: [],
  onePair: [],
  twoPair: [],
  three: [],
  fullHouse: [],
  four: [],
  five: [],
};

let result = 0;

console.log(items);

for (let i = 0; i < items.length; i++) {
  const current = items[i];
  const [hand, bid] = current;

  const cardsCounts = {};

  hand.split("").forEach((card) => {
    if (card in cardsCounts) {
      cardsCounts[card]++;
    } else {
      cardsCounts[card] = 1;
    }
  });

  console.log("--------------------");
  console.log("cards count", cardsCounts);

  const jokersCount = Object.entries(cardsCounts).find(
    ([card]) => card === "J",
  )?.[1];

  const cardsCountSorted = Object.entries(cardsCounts)
    .filter(([card]) => card !== "J")
    .sort((a, b) => b[1] - a[1])
    .map((item, index) => {
      if (index === 0 && jokersCount) {
        const newResult = item[1] + jokersCount;

        return [...item[0], newResult <= 5 ? newResult : 5];
      }

      return item;
    });

  console.log("cardsCountSorted", cardsCountSorted);

  console.log("jokersCount", jokersCount);

  const filtered = cardsCountSorted.filter(([card, count]) => count > 1);

  console.log("filtered", filtered);

  if (filtered.length === 0) {
    sorted.highCard.push(current);
  } else if (filtered.length === 1) {
    const [[card, count]] = filtered;

    if (count === 2) {
      sorted.onePair.push(current);
    } else if (count === 3) {
      sorted.three.push(current);
    } else if (count === 4) {
      sorted.four.push(current);
    } else if (count === 5) {
      sorted.five.push(current);
    }
  } else {
    const [first, second] = filtered;

    if (first[1] === 2 && second[1] === 2) {
      sorted.twoPair.push(current);
    } else {
      sorted.fullHouse.push(current);
    }
  }
}

console.log("sorted", sorted);

let rank = 1;

Object.entries(sorted).forEach(([type, hands]) => {
  if (hands.length === 1) {
    const bid = hands[0][1];
    result += bid * rank;
    rank++;
  } else {
    const sortedByStrength = [...hands].sort((a, b) => {
      const [firstHand] = a;
      const [secondHand] = b;

      let sortNum = 0;

      for (let i = 0; i < firstHand.length; i++) {
        const firstHandChar = firstHand[i];
        const secondHandChar = secondHand[i];

        if (firstHandChar !== secondHandChar) {
          if (
            strengthOrder.indexOf(firstHandChar) <
            strengthOrder.indexOf(secondHandChar)
          ) {
            sortNum = 1;
            break;
          } else if (
            strengthOrder.indexOf(firstHandChar) >
            strengthOrder.indexOf(secondHandChar)
          ) {
            sortNum = -1;
            break;
          }
        }
      }

      return sortNum;
    });

    sortedByStrength.forEach((hand) => {
      const bid = hand[1];

      result += bid * rank;
      rank++;
    });
  }
});

console.log(result);
