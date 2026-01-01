import { components, NoticeProps } from "react-select";

import { cn } from "@shared/lib/utils/cn";

export const NoOptionsMessage = ({ className, ...props }: NoticeProps) => {
  return (
    <components.NoOptionsMessage
      className={cn("bg-gray-700 p-2 text-sm text-gray-50", className)}
      {...props}
    />
  );
};
