import { calcAge } from '../index';

const testCases: (Date | number | string | any)[][] = [
  [new Date('1992-05-10'), 29],
  [new Date('1900-05-10'), 121],
  ['2019-05-10', 2],
  [863222400000, 24],
  [new Date('2024-05-10'), new Error()],
];

const RealDate = Date;
const myCustomizedDateNow = 1631015199463;
const makeSut = () => ({
  sut: calcAge,
});

describe(calcAge.name, () => {
  beforeAll(() => {
    global.Date.now = jest.fn(() => myCustomizedDateNow);
  });

  afterAll(() => {
    global.Date = RealDate;
  });

  test.each(testCases)(
    `given a date of birth %p, the age should be %p`,
    (date: Date, expectedResult: number) => {
      const { sut } = makeSut();
      try {
        expect(sut(date)).toEqual(expectedResult);
      } catch (error) {
        expect(error.message).toContain(
          'Invalid date of birth, it should be a date before 07/09/2021, 12:46:39'
        );
      }
    }
  );
});
