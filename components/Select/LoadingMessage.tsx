import { components, NoticeProps } from "react-select";

import { Skeleton } from "@shared/components/common/Skeleton";
import { cn } from "@shared/lib/utils/cn";

export const LoadingMessage = ({ className, ...props }: NoticeProps) => {
  return (
    <components.LoadingMessage
      className={cn(
        "flex flex-col gap-1 bg-gray-700 p-1 text-sm text-gray-50",
        className
      )}
      {...props}
    >
      <Skeleton className="h-5 w-full bg-gray-600" />
      <Skeleton className="h-5 w-full bg-gray-600" />
      <Skeleton className="h-5 w-full bg-gray-600" />
    </components.LoadingMessage>
  );
};
