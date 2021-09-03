/**
 * @description Apply a case insensitive regex pattern to a string
 * @param x The string to apply the regex to
 * @returns a RegExp object which does case insensitive matching with all text containing the passed string
 */
export const makeCaseInsensitiveRegex = (x: string) => new RegExp(`.*${x}.*`, 'i');

/**
 * @description Apply a formation to an object, applying the case insensitive regex pattern on each its string entries
 * @param query The object to format
 * @returns An object with case insensitive regex pattern in all of its string entries
 */
export const formatQueryToRegex = (query: Record<string, string | string[]>) =>
  Object.keys(query).reduce((acc: Record<string, any>, queryKey: string) => {
    const value = query[queryKey];
    return {
      ...acc,
      [queryKey.replace(/>/g, '.')]:
        typeof value !== 'string' ? value : makeCaseInsensitiveRegex(value),
    };
  }, {});
