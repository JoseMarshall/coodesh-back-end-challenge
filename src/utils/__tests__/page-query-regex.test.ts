import { pageQueryRegex } from '../regex';

const testCases: (string | boolean | any)[][] = [
  ['1', true],
  ['9', true],
  ['10', true],
  ['523', true],

  ['0', false],
  ['01', false],
  ['', false],
  [' ', false],
  ['a1', false],
  ['ab', false],
  ['{}', false],
];

describe('object-stringified-regex', () => {
  test.each(testCases)(
    `given %s as obj stringified, 
    testing with pageQueryRegex should result in %p`,
    async (page: string, expectedMatchResult: boolean) => {
      expect(new RegExp(pageQueryRegex).test(page)).toBe(expectedMatchResult);
    }
  );
});
