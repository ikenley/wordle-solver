import searchDictionary from "./searchDictionary.js";

const SEARCH_PATTERN = "***AR";
const INCLUDE_CHARACTERS = "ARL";
const EXCLUDE_CHARACTERS = "CEPTIUN";

const handleSearchClick = (event) => {
  const searchPattern = sanitizeInput(
    document.getElementById("search-pattern").value
  );
  let includeCharacters = sanitizeInput(
    document.getElementById("include-characters").value
  );
  const excludeCharactes = sanitizeInput(
    document.getElementById("exclude-characters").value
  );

  const excludeIndexCharactersArray = [];
  for (let i = 0; i < 5; i++) {
    excludeIndexCharactersArray[i] = sanitizeInput(
      document.getElementById(`exclude-index-characters-${i}`).value
    );

    // Implicitly add "yellow" characters to includes list
    includeCharacters = includeCharacters.concat(
      excludeIndexCharactersArray[i]
    );
  }

  const showCommonOnly = document.getElementById("show-common-only").checked;

  const resultWords = searchDictionary(
    searchPattern,
    includeCharacters,
    excludeCharactes,
    excludeIndexCharactersArray,
    showCommonOnly
  );

  renderResults(resultWords);
};

const sanitizeInput = (txt) => {
  return txt.trim().toUpperCase();
};

const renderResults = (words) => {
  const resultList = document.getElementById("result-list");
  resultList.innerHTML = "";
  words.forEach((word) => {
    const li = document.createElement("li");
    li.innerText = `${word.value} (${word.frequency})`;
    resultList.appendChild(li);
  });
};

document
  .getElementById("run-search")
  .addEventListener("click", handleSearchClick);
