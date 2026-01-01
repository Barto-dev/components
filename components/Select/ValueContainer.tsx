import { components, ValueContainerProps } from "react-select";

import { cn } from "@shared/lib/utils/cn";

export const ValueContainer = ({
  className,
  ...props
}: ValueContainerProps) => {
  return (
    <components.ValueContainer
      className={cn(
        "min-h-[44px] gap-1 py-1 pr-3 pl-4 text-sm text-gray-50",
        className
      )}
      {...props}
    />
  );
};
