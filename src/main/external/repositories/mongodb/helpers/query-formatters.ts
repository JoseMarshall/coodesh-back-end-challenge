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
    if (typeof value !== 'string') return { ...acc, [queryKey.replace(/>/g, '.')]: value };

    const mapValue = {
      true: () => {
        // Assumes the query values follow this format: value1|value2
        const valuesArray = value.split('|');
        return {
          // Transforms the query key 'firstName|lastName' to ['firstName', 'lastName']
          $or: queryKey.split('|').reduce(
            (x, key, index) =>
              x.concat({
                [key.replace(/>/g, '.')]: makeCaseInsensitiveRegex(valuesArray[index]),
              }),
            [] as ReadonlyArray<Record<string, any>>
          ),
        };
      },
      false: () => ({
        // Since mongoose-sanitize remove every dot from query, client should use ">" instead,
        // when intend to search for a nested object key
        // Transforms field>nestedField1>..>nestedFieldN to field.nestedField1.nestedFieldN
        [queryKey.replace(/>/g, '.')]: makeCaseInsensitiveRegex(value),
      }),
    };

    return { ...acc, ...mapValue[String(queryKey.includes('|')) as 'true' | 'false']() };
  }, {});
