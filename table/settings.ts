import {
  ColumnOrderState,
  ColumnPinningState,
  ColumnSizingState,
  RowPinningState,
  VisibilityState
} from "@tanstack/react-table";
import { StateCreator } from "zustand";

export interface TableSettings {
  columnVisibility: VisibilityState;
  rowPinning: RowPinningState;
  columnPinning: ColumnPinningState;
  columnOrder: ColumnOrderState;
  columnSizing: ColumnSizingState;
}

export interface TableActions {
  setColumnVisibility: (columnVisibility: VisibilityState) => void;
  setRowPinning: (rowPinning: RowPinningState) => void;
  setColumnPinning: (columnPinning: ColumnPinningState) => void;
  setColumnOrder: (columnOrder: ColumnOrderState) => void;
  setColumnSizing: (columnSizing: ColumnSizingState) => void;
  resetSettings: () => void;
}

export const initialTableSettings: TableSettings = {
  columnVisibility: {},
  rowPinning: { top: [], bottom: [] },
  columnPinning: { left: [], right: [] },
  columnOrder: [],
  columnSizing: {}
};

export type TableStore = TableSettings & TableActions;

export const createTableSettingsSlice =
  (initialState: TableSettings): StateCreator<TableStore> =>
  (set) => ({
    ...initialState,
    setColumnVisibility: (columnVisibility) => set({ columnVisibility }),
    setRowPinning: (rowPinning) => set({ rowPinning }),
    setColumnPinning: (columnPinning) => set({ columnPinning }),
    setColumnOrder: (columnOrder) => set({ columnOrder }),
    setColumnSizing: (columnSizing) => set({ columnSizing }),
    resetSettings: () => set(initialState)
  });
