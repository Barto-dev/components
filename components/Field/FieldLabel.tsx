import * as LabelPrimitive from "@radix-ui/react-label";
import { ComponentProps } from "react";

import { useField } from "./Field";

interface FieldLabelProps extends ComponentProps<typeof LabelPrimitive.Root> {
  isDisabled?: boolean;
}

export const FieldLabel = ({
  className,
  isDisabled = false,
  ...props
}: FieldLabelProps) => {
  const { error, fieldItemId, isRequired } = useField();

  return (
    <Label
      data-slot="field-label"
      data-error={!!error}
      data-disabled={isDisabled}
      className={cn("data-[error=true]:text-error-400 gap-0", className)}
      htmlFor={fieldItemId}
      isRequired={isRequired}
      {...props}
    >
      {props.children}
    </Label>
  );
};
