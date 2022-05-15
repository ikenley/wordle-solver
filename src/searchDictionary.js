import dictionary from "../data/dictionary.js";
import { orderBy } from "lodash";

const searchDictionary = (
  searchPattern,
  includeCharacters,
  excludeCharactes,
  excludeIndexCharactersArray,
  showCommonOnly
) => {
  const wordsWithCommonOnlyFilter = filterByShowCommonOnly(
    dictionary,
    showCommonOnly
  );
  const wordsContaining = containsAllCharacters(
    wordsWithCommonOnlyFilter,
    includeCharacters
  );
  const wordsExcluding = notContainsAnyCharacters(
    wordsContaining,
    excludeCharactes
  );

  let wordsIndexExcluding = wordsExcluding;
  for (let ix = 0; ix < excludeIndexCharactersArray.length; ix++) {
    wordsIndexExcluding = notContainCharactersAtIndex(
      wordsIndexExcluding,
      ix,
      excludeIndexCharactersArray[ix]
    );
  }

  const positionMatchingWords = filterByPositionPattern(
    wordsIndexExcluding,
    searchPattern
  );

  const sortedWords = orderBy(
    positionMatchingWords,
    ["uniqueChars", "frequency"],
    ["desc", "desc"]
  );

  return sortedWords;
};

const filterByShowCommonOnly = (words, showCommonOnly) => {
  const filteredWords = words.filter((word) => {
    return word.isCommon || !showCommonOnly;
  });

  return filteredWords;
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
        if (word.value.charAt(i) !== char) {
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
      if (!word.value.includes(char)) {
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
      if (word.value.includes(char)) {
        containsCharacter = true;
        return;
      }
    });
    // If no misses, return true
    return !containsCharacter;
  });

  return filteredWords;
};

const notContainCharactersAtIndex = (words, ix, exclusionCharacters) => {
  const characters = [...exclusionCharacters];

  const filteredWords = words.filter((word) => {
    let containsCharacter = false;
    characters.forEach((char) => {
      if (word.value.charAt(ix).toString() === char) {
        containsCharacter = true;
        return;
      }
    });
    // If no misses, return true
    return !containsCharacter;
  });

  return filteredWords;
};

export default searchDictionary;
