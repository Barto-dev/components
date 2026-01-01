import ReactSelect, { Props } from "react-select";

import {
  ClearIndicator,
  Control,
  DropdownIndicator,
  GroupHeading,
  IndicatorSeparator,
  LoadingMessage,
  Menu,
  MenuList,
  MultiValueRemove,
  NoOptionsMessage,
  Option,
  Placeholder,
  SelectContainer,
  ValueContainer
} from "./components";

export type SelectProps = Omit<Props, "size">;

const singleValueStyles = () => "leading-6";
const multiValueStyles = () =>
  "flex cursor-default items-center gap-1 rounded-full bg-white/5 py-0.5 pr-2 pl-3 text-sm text-gray-50";
const multiValueRemoveStyles = () => "cursor-pointer [&>svg]:size-4";
const indicatorsContainerStyles = () => "pr-1";
const menuPortalStyles = () => "z-20";

export const Select = ({ components, ...props }: SelectProps) => {
  return (
    <ReactSelect
      unstyled
      menuPlacement="auto"
      components={{
        Menu,
        DropdownIndicator,
        ClearIndicator,
        MultiValueRemove,
        LoadingMessage,
        Option,
        NoOptionsMessage,
        MenuList,
        Placeholder,
        SelectContainer,
        IndicatorSeparator,
        GroupHeading,
        ValueContainer,
        Control,
        ...components
      }}
      classNames={{
        singleValue: singleValueStyles,
        multiValue: multiValueStyles,
        multiValueRemove: multiValueRemoveStyles,
        indicatorsContainer: indicatorsContainerStyles,
        menuPortal: menuPortalStyles
      }}
      {...props}
    />
  );
};
