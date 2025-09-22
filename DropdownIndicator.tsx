import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { components, DropdownIndicatorProps } from "react-select";

import { cn } from "@shared/lib/utils/cn";

export const DropdownIndicator = (props: DropdownIndicatorProps) => {
  const isDisabled = props.isDisabled;
  const isMenuOpen = props.selectProps.menuIsOpen;

  return (
    <components.DropdownIndicator
      className={cn(
        'cursor-pointer pr-3 text-gray-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-5',
        isDisabled && "opacity-50"
      )}
      {...props}
    >
      {isMenuOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </components.DropdownIndicator>
  );
};
