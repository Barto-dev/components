import { components, MenuListProps } from "react-select";

import { cn } from "@shared/lib/utils/cn";

export const MenuList = ({ className, ...props }: MenuListProps) => {
  return (
    <components.MenuList
      className={cn("flex flex-col gap-0.5", className)}
      {...props}
    />
  );
};
