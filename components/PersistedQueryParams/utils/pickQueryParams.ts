import queryString from "query-string";

// Extracts only the listed keys from a search string, dropping arrays and bare flags.
export const pickQueryParams = (search: string, keys: readonly string[]) => {
  const parsed = queryString.parse(search);
  const result: Record<string, string> = {};
  for (const key of keys) {
    const value = parsed[key];
    if (typeof value === "string") result[key] = value;
  }
  return result;
};
