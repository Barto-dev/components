import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Column } from "@tanstack/react-table";
import { GripVertical } from "lucide-react";
import { HTMLAttributes } from "react";

interface DataTableSortableColumnProps<TData, TValue>
  extends HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
}

export const DataTableSettingSortableColumn = <TData, TValue>({
  column
}: DataTableSortableColumnProps<TData, TValue>) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
    isDragging
  } = useSortable({ id: column.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="rounded-8 mb-2 flex items-center gap-2 bg-gray-800 p-3 pl-2 text-sm font-semibold text-gray-50 transition-colors"
      {...attributes}
    >
      <div
        className="flex cursor-grab items-center text-gray-400 active:cursor-grabbing"
        ref={setActivatorNodeRef}
        {...listeners}
      >
        <GripVertical className="size-5" />
      </div>

      <div key={column.id} className="flex gap-2">
        <Switch
          id={column.id}
          checked={column.getIsVisible()}
          onCheckedChange={() => {
            column.toggleVisibility(!column.getIsVisible());
          }}
        />
        <Label htmlFor={column.id}>{column.columnDef.meta?.title ?? ""}</Label>
      </div>
    </li>
  );
};
