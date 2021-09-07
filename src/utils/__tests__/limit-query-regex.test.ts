import { limitQueryRegex } from '../regex';

const testCases: (string | boolean | any)[][] = [
  ['1', true],
  ['9', true],
  ['10', true],
  ['523', true],
  ['0', true],
  ['01', true],

  ['', false],
  [' ', false],
  ['a1', false],
  ['ab', false],
  ['{}', false],
];

describe('object-stringified-regex', () => {
  test.each(testCases)(
    `given %s as obj stringified, 
    testing with limitQueryRegex should result in %p`,
    async (limit: string, expectedMatchResult: boolean) => {
      expect(new RegExp(limitQueryRegex).test(limit)).toBe(expectedMatchResult);
    }
  );
});
