import { components, MenuProps } from "react-select";

import { cn } from "@shared/lib/utils/cn";

export const Menu = ({ className, ...props }: MenuProps) => {
  return (
    <components.Menu
      className={cn(
        "rounded-12 relative z-50 my-1 border border-gray-600 bg-gray-700 p-1 text-gray-50",
        className
      )}
      {...props}
    />
  );
};
