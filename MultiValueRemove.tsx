import { XIcon } from "lucide-react";
import { components, MultiValueRemoveProps } from "react-select";

export const MultiValueRemove = (props: MultiValueRemoveProps) => {
  return (
    <components.MultiValueRemove {...props}>
      <XIcon className="size-4!" />
    </components.MultiValueRemove>
  );
};
