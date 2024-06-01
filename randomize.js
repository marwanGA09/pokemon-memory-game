export default function shuffle(array) {
  const shuffledArray = [...array]; // Create a copy to avoid modifying the original
  let currentIndex = shuffledArray.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = shuffledArray[currentIndex];
    shuffledArray[currentIndex] = shuffledArray[randomIndex];
    shuffledArray[randomIndex] = temporaryValue;
  }

  return shuffledArray;
}

// const originalArray = [1, 2, 3, 4, 5];
// const randomizedArray = shuffle(originalArray);
// console.log(originalArray); // Remains unchanged (important)
// console.log(randomizedArray); // The shuffled array
