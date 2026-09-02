import queryString from "query-string";

// Merges the persisted snapshot with the current URL search (current wins),
// returning a `?...` string ready for navigation, or null when nothing to restore.
export const getRestoredSearch = (
  snapshot: Record<string, string>,
  currentSearch: string
) => {
  if (!Object.keys(snapshot).length) return null;
  const merged = {
    ...snapshot,
    ...queryString.parse(currentSearch)
  };
  return `?${queryString.stringify(merged)}`;
};
