import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { Table } from "@tanstack/react-table";
import { X, Settings } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "../Drawer";
import { DataTableSettingLockedColumn } from "./DataTableSettingsLockedColumn";
import { DataTableSettingSortableColumn } from "./DataTableSettingSortableColumn";

interface DataTableSettingsProps<TData> {
  table: Table<TData>;
}

export const DataTableSettings = <TData,>({
  table,
}: DataTableSettingsProps<TData>) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      table.setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex);
      });
    }
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button>
          <Settings />
        </button>
      </DrawerTrigger>
      <DrawerContent className="bg-gray-900">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="mt-8 mb-6 flex flex-row items-center justify-between py-0">
            <DrawerTitle className="text-base-semibold">
              Table customization
            </DrawerTitle>
            <DrawerClose aria-label="Close table settings">
              <X className="size-5" />
            </DrawerClose>
          </DrawerHeader>
          <div className="px-4">
            <section className="flex flex-col gap-1">
              {table
                .getAllLeafColumns()
                .filter((column) => !column.getCanHide())
                .map((column) => (
                  <DataTableSettingLockedColumn
                    key={column.id}
                    column={column}
                  />
                ))}
            </section>
            <DndContext
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis]}
              onDragEnd={handleDragEnd}
              sensors={sensors}
            >
              <SortableContext
                items={table.getState().columnOrder.map((id) => id)}
                strategy={verticalListSortingStrategy}
              >
                <section className="flex flex-col gap-1">
                  {table
                    .getAllLeafColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
                      <DataTableSettingSortableColumn
                        key={column.id}
                        column={column}
                      />
                    ))}
                </section>
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
