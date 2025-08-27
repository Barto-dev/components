import type { ColumnOrderState, OnChangeFn } from "@tanstack/react-table";
import { useMemo, useState } from "react";

interface UseColumnOrderOptions {
  storageKey?: TableStorageKey;
}

export const useColumnOrder = (
  options?: UseColumnOrderOptions
) => {
  const { storageKey } = options || {};
  const tableSettings = getPersistedTableSettings(storageKey);

  const initialOrder = tableSettings?.use.columnOrder?.() || [];
  const persistOrder = tableSettings?.use.setColumnOrder();
  const defaultOrder = useMemo(() => initialOrder, [storageKey]);

  const [columnOrder, setColumnOrder] =
    useState<ColumnOrderState>(defaultOrder);

  const onColumnOrderChange: OnChangeFn<ColumnOrderState> = (
    updaterOrValue
  ) => {
    const newOrder =
      typeof updaterOrValue === "function"
        ? updaterOrValue(columnOrder)
        : updaterOrValue;
    persistOrder?.(newOrder);
    setColumnOrder(newOrder);
    return newOrder;
  };

  return {
    columnOrder,
    onColumnOrderChange
  };
};
