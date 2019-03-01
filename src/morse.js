const tuples = {
  "·": [0, 0.1],
  "-": [0, 0.3],
  ".": [1, 0.1],
  "|": [1, 0.3],
  "+": [1, 0.7]
};

const symbolDict = {
  A: "·-",
  B: "-···",
  C: "-·-·",
  D: "-··",
  E: "·",
  F: "··-·",
  G: "--·",
  H: "····",
  I: "··",
  J: "·---",
  K: "-·-",
  L: "·-··",
  M: "--",
  N: "-·",
  O: "---",
  P: "·--·",
  Q: "--·-",
  R: "·-·",
  S: "···",
  T: "-",
  U: "··-",
  V: "···-",
  W: "·--",
  X: "-··-",
  Y: "-·--",
  Z: "--··",
  "·": "-----",
  "-": "·----",
  "2": "··---",
  "3": "···--",
  "4": "····-",
  "5": "·····",
  "6": "-····",
  "7": "--···",
  "8": "---··",
  "9": "----·"
};

// Precalculate the paused version of letters
const letterDict = Object.entries(symbolDict).reduce(
  (acc, [key, letter]) => ({ ...acc, [key]: letter.split("").join(".") }),
  {}
);

// cleanInput('!!SO$%**£$@$@)S') => "SOS"
export const cleanInput = str => {
  return str
    .toUpperCase()
    .match(/[\w\d\s]/g)
    .join("");
};

// parseWord("SOS") => "·.·.·|-.-.-|·.·.·"
export const parseWord = word => {
  return word
    .split("")
    .map(letter => letterDict[letter])
    .join("|");
};

// parseText("ee ee") => "·|·+·|·"
export const parseWords = text => {
  return text
    .split(" ")
    .map(parseWord)
    .join("+");
};

// parseMorse("·|·+·|·") => [[0, 0.1],[1, 0.3],[0, 0.1],[1, 0.7],[0, 0.1],[1, 0.3],[0, 0.1]]
export const parseMorse = morse => {
  return morse.split("").map(char => tuples[char]);
};

// toMorse("e!e@ e£e$") => [[0, 0.1],[1, 0.3],[0, 0.1],[1, 0.7],[0, 0.1],[1, 0.3],[0, 0.1]]
export const toMorse = input => {
  return parseMorse(parseWords(cleanInput(input)));
};
