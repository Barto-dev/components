import { components, IndicatorSeparatorProps } from "react-select";

export const IndicatorSeparator = (props: IndicatorSeparatorProps) => {
  return (
    <components.IndicatorSeparator
      {...props}
      className="hidden"
    />
  );
};
