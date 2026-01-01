import { components, PlaceholderProps } from "react-select";

import { cn } from "@shared/lib/utils/cn";

export const Placeholder = ({ className, ...props }: PlaceholderProps) => {
  return (
    <components.Placeholder
      className={cn("text-sm text-gray-500", className)}
      {...props}
    />
  );
};
