/* eslint-disable import/prefer-default-export */
/**
 * Safely converts a string to an integer.
 * @param s A string to convert into a number.
 * @param radix A value between 2 and 36 that specifies the base of the number in numString.
 * If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal.
 * All other strings are considered decimal.
 */
export const safeParseInt = (s: string, radix?: number) => {
  const parsedData = parseInt(s, radix);
  return Number.isNaN(parsedData) ? 0 : parsedData;
};

/**
 * @description Add a number of days to a Date
 * @param date The date you intend to add days to
 * @param days The number of days you intend to add, N.B.: You can pass negative numbers if you intend to subtract days instead of add
 * @returns The new date added the specified number of days
 */
export function addDays(date: Date, days: number) {
  const newDate = new Date(Number(date));
  newDate.setDate(date.getDate() + days);
  return newDate.getDate() ? newDate : undefined;
}
