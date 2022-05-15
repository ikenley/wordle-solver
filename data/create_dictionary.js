import fs from "fs";
import dictionaryArray from "./dictionary-array.js";
import commonWords from "./common-words.js";
import uniq from "lodash/uniq.js";

// Assign frequency and isCommon to words

const frequencyMap = {
  A: 0.082,
  B: 0.015,
  C: 0.028,
  D: 0.043,
  E: 0.13,
  F: 0.022,
  G: 0.02,
  H: 0.061,
  I: 0.07,
  J: 0.0015,
  K: 0.0077,
  L: 0.04,
  M: 0.025,
  N: 0.067,
  O: 0.075,
  P: 0.019,
  Q: 0.00095,
  R: 0.06,
  S: 0.063,
  T: 0.091,
  U: 0.028,
  V: 0.0098,
  W: 0.024,
  X: 0.0015,
  Y: 0.02,
  Z: 0.00074,
};

const calculateFrequency = (word) => {
  const letters = [...word];

  let frequency = 0;
  letters.forEach((char) => {
    frequency += frequencyMap[char];
  });

  const rounded = Math.round(frequency * 100) / 100;

  return rounded;
};

const assignFrequency = (words) => {
  const dictionary = words.map((word) => {
    return {
      value: word,
      frequency: calculateFrequency(word),
    };
  });

  return dictionary;
};

const assignIsCommmon = (words) => {
  const wordsWithIsCommon = words.map((word) => {
    return {
      ...word,
      isCommon: commonWords.includes(word.value.toLowerCase()),
    };
  });

  return wordsWithIsCommon;
};

const assignUniqueChars = (words) => {
  const wordsWithUniqueChars = words.map((word) => {
    return {
      ...word,
      uniqueChars: uniq(word.value).length,
    };
  });

  return wordsWithUniqueChars;
};

const main = () => {
  const wordsWithFrequency = assignFrequency(dictionaryArray);
  const wordsWithIsCommon = assignIsCommmon(wordsWithFrequency);
  const wordsWithUniqueChars = assignUniqueChars(wordsWithIsCommon);

  const json = JSON.stringify(wordsWithUniqueChars);
  const fileContent = `export default ${json}`;
  fs.writeFileSync("./dictionary.js", fileContent);
};

main();
