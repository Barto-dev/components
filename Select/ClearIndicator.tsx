import { CircleXIcon } from "lucide-react";
import { ClearIndicatorProps, components } from "react-select";

import { cn } from "@shared/lib/utils/cn";

export const ClearIndicator = ({
  className,
  ...props
}: ClearIndicatorProps) => {
  return (
    <components.ClearIndicator
      className={cn("cursor-pointer pr-1 [&>svg]:size-5", className)}
      {...props}
    >
      <CircleXIcon />
    </components.ClearIndicator>
  );
};
