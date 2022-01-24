import searchDictionary from "./searchDictionary.js";

const SEARCH_PATTERN = "***AR";
const INCLUDE_CHARACTERS = "ARL";
const EXCLUDE_CHARACTERS = "CEPTIUN";

const handleSearchClick = (event) => {
  const searchPattern = sanitizeInput(
    document.getElementById("search-pattern").value
  );
  const includeCharacters = sanitizeInput(
    document.getElementById("include-characters").value
  );
  const excludeCharactes = sanitizeInput(
    document.getElementById("exclude-characters").value
  );
  console.log(`searchPattern=${searchPattern}`);

  const resultWords = searchDictionary(
    searchPattern,
    includeCharacters,
    excludeCharactes
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
