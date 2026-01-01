import { components, GroupHeadingProps } from "react-select";

export const GroupHeading = (props: GroupHeadingProps) => {
  return (
    <components.GroupHeading
      {...props}
      className="mt-2 mb-1 ml-3 text-sm text-gray-50"
    />
  );
};
