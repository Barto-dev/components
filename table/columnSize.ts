import type { ColumnSizingState, OnChangeFn } from "@tanstack/react-table";
import { useMemo, useState } from "react";

import { getPersistedTableSettings } from "";

type TableStorageKey = Parameters<typeof getPersistedTableSettings>[0];

interface UseColumnSizeOptions {
  storageKey?: TableStorageKey;
}

export const useColumnSize = (
  options?: UseColumnSizeOptions
): UseColumnSizeReturn => {
  const { storageKey } = options || {};
  const tableSettings = getPersistedTableSettings(storageKey);

  const initialSizing = tableSettings?.use.columnSizing?.() || {};
  const persistSizing = tableSettings?.use.setColumnSizing();
  const defaultSizing = useMemo(() => initialSizing, [storageKey]);

  const [columnSizing, setColumnSizing] =
    useState<ColumnSizingState>(defaultSizing);

  const onColumnSizingChange: OnChangeFn<ColumnSizingState> = (
    updaterOrValue
  ) => {
    const newSizing =
      typeof updaterOrValue === "function"
        ? updaterOrValue(columnSizing)
        : updaterOrValue;
    persistSizing?.(newSizing);
    setColumnSizing(newSizing);
    return newSizing;
  };

  return {
    columnSizing,
    onColumnSizingChange
  };
};
