import type { OnChangeFn, SortingState } from "@tanstack/react-table";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";

/**
 Sync table sorting state with URL using nuqs.
 @template TColumnKeys - keys of sortable columns (e.g. "name" | "email" | "createdAt")
 @param paramKey - query param key in URL to store sorting info, e.g. "sort" or "userSort"
 @param initial - default sorting state if none in URL (does not write to URL until changed)
 */

interface UseQuerySortingOptions<TColumnKeys extends string> {
  paramKey?: string;
  initial?: { id: TColumnKeys; desc: boolean }[];
}

export function useQuerySorting<TColumnKeys extends string>(
  options: UseQuerySortingOptions<TColumnKeys> = {}
): {
  sorting: { id: TColumnKeys; desc: boolean }[];
  onSortingChange: OnChangeFn<SortingState>;
  resetSorting: () => void;
} {
  const { paramKey = "sort", initial = [] } = options;
  const sortParser = parseAsArrayOf(parseAsString).withDefault([]);
  const [sortParam, setSortParam] = useQueryState(paramKey, sortParser);

  // Parse sorting state from URL query params (format: "column:direction") or use initial state if empty
  const sorting: { id: TColumnKeys; desc: boolean }[] =
    sortParam.length > 0
      ? (sortParam.map((s) => {
          const [id, dir] = s.split(":");
          return { id: id as TColumnKeys, desc: dir === "desc" };
        }) as { id: TColumnKeys; desc: boolean }[])
      : initial;

  const onSortingChange: OnChangeFn<SortingState> = (updater) => {
    const newSorting =
      typeof updater === "function" ? updater(sorting) : updater;

    if (newSorting.length === 0) {
      setSortParam(null); // remove param from URL on reset
    } else {
      setSortParam(
        newSorting.map(
          (column) => `${column.id}:${column.desc ? "desc" : "asc"}`
        )
      );
    }
  };

  const resetSorting = () => setSortParam(null);

  return { sorting, onSortingChange, resetSorting };
}
