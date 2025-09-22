import { components, ContainerProps } from "react-select";

export const SelectContainer = (props: ContainerProps) => {
  return (
    <components.SelectContainer
      {...props}
      className="w-full"
    />
  );
};
