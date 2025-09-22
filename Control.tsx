import { components, ControlProps } from "react-select";

import { cn } from "@shared/lib/utils/cn";

export const Control = ({ className, isFocused, ...props }: ControlProps) => {
  return (
    <components.Control
      isFocused={isFocused}
      className={cn(
        "rounded-8 has-aria-invalid:border-error-500 aria-invalid:hover:border-error-500 border border-gray-600 hover:border-gray-500 focus:border-gray-500 aria-disabled:border-gray-700 aria-disabled:bg-gray-800 aria-disabled:text-gray-500",
        isFocused && "border-gray-500",
        className
      )}
      {...props}
    />
  );
};
