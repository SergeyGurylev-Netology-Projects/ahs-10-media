import { isCoordsValid } from '../validators';

test.each([
  ['9.9824245,76.5703886', true],
  ['51.50851, -0.12572', true],
  ['51.50851,-0.12572', true],
  ['[51.50851, -0.12572]', true],
  ['[51.50851,-0.12572]', true],
  ['9.9824245 76.5703886', false],
  ['abcde', false],
  ['', false],
])(
  ('test isCoordsValid "%s"'
  ),
  (coords, expected) => {
    const result = isCoordsValid(coords);
    expect(result).toBe(expected);
  },
);
