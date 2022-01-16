import dictionary from "./data/dictionary.js";

const SEARCH_PATTERN = "R*T**";
const INCLUDE_CHARACTERS = "AER";
const EXCLUDE_CHARACTERS = "W";

const main = () => {
  const wordsContaining = containsAllCharacters(dictionary, INCLUDE_CHARACTERS);
  const wordsExcluding = notContainsAnyCharacters(
    wordsContaining,
    EXCLUDE_CHARACTERS
  );
  const positionMatchingWords = filterByPositionPattern(
    wordsExcluding,
    SEARCH_PATTERN
  );
  positionMatchingWords.forEach((word) => console.log(word));
};

/*
* Filters a given set of words on whether they contain characters at same 
    position as searchPattern
*/
const filterByPositionPattern = (words, searchPattern) => {
  const filteredWords = words.filter((word) => {
    let missingACharacter = false;

    for (let i = 0; i < searchPattern.length; i++) {
      const char = searchPattern.charAt(i);
      // Ignore wildcards
      if (isLetter(char)) {
        if (word.charAt(i) !== char) {
          missingACharacter = true;
          break;
        }
      }
    }

    // If no misses, return true
    return !missingACharacter;
  });

  return filteredWords;
};

const isLetter = (str) => {
  return str.length === 1 && str.match(/[a-z]/i);
};

const containsAllCharacters = (words, inclusionCharacters) => {
  const characters = [...inclusionCharacters];

  const filteredWords = words.filter((word) => {
    let missingACharacter = false;
    characters.forEach((char) => {
      if (!word.includes(char)) {
        missingACharacter = true;
        return;
      }
    });
    // If no misses, return true
    return !missingACharacter;
  });

  return filteredWords;
};

const notContainsAnyCharacters = (words, exclusionCharacters) => {
  const characters = [...exclusionCharacters];

  const filteredWords = words.filter((word) => {
    let containsCharacter = false;
    characters.forEach((char) => {
      if (word.includes(char)) {
        containsCharacter = true;
        return;
      }
    });
    // If no misses, return true
    return !containsCharacter;
  });

  return filteredWords;
};

main();
