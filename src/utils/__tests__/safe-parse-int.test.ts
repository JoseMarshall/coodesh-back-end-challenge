import { safeParseInt } from '../index';

const testCases: (string | number | any)[][] = [
  ['10', 10],
  ['10.5', 10],
  ['-10', -10],
  ['-10.6', -10],
  ['2+3', 2],
  ['1-2', 1],
  ['2+3=4', 2],
  ['0', 0],
  ['10a', 10],
  ['10^#%@^sndns357253a', 10],
  ['^#%@^sndns3553a', 0],
  ['^#%@^sndns35 53a', 0],
  ['^#%@^sndns 35.53a', 0],
  [' ', 0],
  ['-Inf', 0],
  ['+Inf', 0],
  [NaN, 0],
  [undefined, 0],
  [null, 0],
];

describe('safe parse int each test case', () => {
  test.each(testCases)(
    `given %s as string to be parsed, 
    the result should be %i`,
    async (str: string, expectedResult: number) => {
      expect(safeParseInt(str)).toBe(expectedResult);
    }
  );
});
