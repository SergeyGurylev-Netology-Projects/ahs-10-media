export function isCoordsValid(value) {
  const regexExp = /^\[?((\-?|\+?)?\d+(\.\d+)?),\s*((\-?|\+?)?\d+(\.\d+)?)\]?$/gm;

  return regexExp.test(value);
}
