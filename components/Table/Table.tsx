interface DataTableProps<TData> {
  table: TableType<TData>;
  children: ReactNode;
  isResizable?: boolean;
  className?: string;
}

export const DataTable = <TData,>({
  table,
  children,
  isResizable,
  className
}: DataTableProps<TData>) => {
  const columnWidthVariables = useMemo(() => {
    const headers = table.getFlatHeaders();
    const columnWidths: Record<string, number> = {};

    headers.forEach((header) => {
      columnWidths[`--header-${header.id}-size`] = header.getSize();
      columnWidths[`--column-${header.column.id}-size`] =
        header.column.getSize();
    });

    return columnWidths;
  }, [table.getState().columnSizingInfo, table.getState().columnVisibility]);

  const tableWidth = useMemo(() => {
    return `max(100%, ${table.getTotalSize()}px)`;
  }, [table.getState().columnSizingInfo, table.getState().columnVisibility]);

  return (
    <Table
      className={className}
      style={
        isResizable ? { ...columnWidthVariables, width: tableWidth } : undefined
      }
    >
      {children}
    </Table>
  );
};
