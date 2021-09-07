import { formatQueryToRegex } from '../query-formatters';

const testCases: (Record<string, string | string[]> | Record<string, RegExp> | any)[][] = [
  [{}, {}],
  [
    {
      name: 'joaquim',
    },
    { name: /.*joaquim.*/i },
  ],
  [
    {
      name: 'joaquim ferreira',
    },
    { name: /.*joaquim ferreira.*/i },
  ],
  [
    {
      'person>name': 'joaquim ferreira',
    },
    { 'person.name': /.*joaquim ferreira.*/i },
  ],
];

describe('format value in query object to regex ', () => {
  test.each(testCases)(
    `given %o as query object, 
    the result should be %o`,
    async (query: Record<string, string | string[]>, expectedResult: Record<string, RegExp>) => {
      expect(formatQueryToRegex(query)).toEqual(expectedResult);
    }
  );
});
