import { makeCaseInsensitiveRegex } from '../query-formatters';

const testCases: (string | any)[][] = [
  ['10', /.*10.*/i],
  ['coodesh', /.*coodesh.*/i],
  ['.', /.*..*/i],
  [' ', /.* .*/i],
  ['', /.*.*/i],
];

describe('make case insensitive regex for each test case', () => {
  test.each(testCases)(
    `given %s as string to be "regexed", 
    the result should be a case insensitive regex`,
    async (str: string, expectedResult: number) => {
      expect(makeCaseInsensitiveRegex(str)).toStrictEqual(expectedResult);
    }
  );
});
