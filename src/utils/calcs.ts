/* eslint-disable import/prefer-default-export */
/**
 * Calculate how many years from a given date
 * @param dateOfBirth The date of birth to calculate the age of.
 * @returns a number representing the age
 */
export const calcAge = (dateOfBirth: Date | number | string) => {
  const castedDate = dateOfBirth instanceof Date ? dateOfBirth : new Date(dateOfBirth);
  const diffDate = new Date(Date.now() - castedDate.getTime());
  const result = diffDate.getUTCFullYear() - 1970;

  if (result < 0)
    throw new Error(
      `Invalid date of birth, it should be a date before ${new Date().toLocaleString()}`
    );
  return result;
};
