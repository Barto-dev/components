import { CheckIcon } from "lucide-react";
import { components, OptionProps } from "react-select";

import { cn } from "@shared/lib/utils/cn";

const focusStyles = "bg-gray-600 active:bg-gray-600";

export const Option = ({
  isMulti,
  isFocused,
  isSelected,
  ...props
}: OptionProps) => {
  if (isMulti) {
    return (
      <components.Option
        className={cn(
          "rounded-6 flex! items-center gap-2 py-1.5 pr-8 pl-2 text-sm! text-gray-50",
          isFocused && focusStyles
        )}
        isFocused={isFocused}
        isMulti={isMulti}
        isSelected={isSelected}
        {...props}
      >
        <span className="rounded-2 center size-4 border border-gray-300" />
        {props.children}
      </components.Option>
    );
  }

  if (isSelected) {
    return (
      <components.Option
        className={cn(
          "rounded-6 flex! bg-gray-600 py-1.5 pr-8 pl-2 text-sm! text-gray-50",
          isFocused && focusStyles
        )}
        isFocused={isFocused}
        isMulti={isMulti}
        isSelected={isSelected}
        {...props}
      >
        <div className="flex w-full justify-between">
          {props.children}
          <CheckIcon />
        </div>
      </components.Option>
    );
  }

  return (
    <components.Option
      className={cn(
        "rounded-6 flex! py-1.5 pr-8 pl-2 text-sm! text-gray-50",
        isFocused && focusStyles
      )}
      isFocused={isFocused}
      isMulti={isMulti}
      isSelected={isSelected}
      {...props}
    />
  );
};
