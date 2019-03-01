import * as app from "../morse";

const sosMorse = "·.·.·|-.-.-|·.·.·";

const sosTuples = [
  [0, 0.1],
  [1, 0.1],
  [0, 0.1],
  [1, 0.1],
  [0, 0.1],

  [1, 0.3],

  [0, 0.3],
  [1, 0.1],
  [0, 0.3],
  [1, 0.1],
  [0, 0.3],

  [1, 0.3],

  [0, 0.1],
  [1, 0.1],
  [0, 0.1],
  [1, 0.1],
  [0, 0.1]
];

describe("parser", () => {
  it("can parse a word into a delimited morse string", () => {
    expect(app.parseWord("SOS")).toBe(sosMorse);
  });

  it("can parse text into a delimited morse string", () => {
    expect(app.parseWords("SOS SOS")).toBe(`${sosMorse}+${sosMorse}`);
  });

  it("can turn a morse string into tuples", () => {
    expect(app.parseMorse(sosMorse)).toEqual(sosTuples);
  });

  it("can translate text into morse", () => {
    const expected = [...sosTuples, [1, 0.7], ...sosTuples];
    expect(app.toMorse("sos sos")).toEqual(expected);
    expect(app.toMorse("!s@o£s$ %s^o&s")).toEqual(expected);
  });
});
