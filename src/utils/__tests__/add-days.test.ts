import { addDays } from '../index';

const testCases: (Date | number | any)[][] = [
  [new Date('2020-05-10'), 10, new Date('2020-05-20')],
  [new Date('2020-05-10'), -10, new Date('2020-04-30')],
  [new Date('2020-05-10'), 10.5, new Date('2020-05-20')],
  [new Date('2020-05-10'), -10.5, new Date('2020-04-30')],
  [new Date(''), 10, undefined],
];

const makeSut = () => ({
  sut: addDays,
});

describe(addDays.name, () => {
  test.each(testCases)(
    `given a date %p and %i the number of days to add, 
    the result should be %p`,
    (date: Date, dayToAdd: number, expectedResult: Date) => {
      const { sut } = makeSut();
      expect(sut(date, dayToAdd)).toEqual(expectedResult);
    }
  );
});
