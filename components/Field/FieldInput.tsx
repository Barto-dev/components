import { ComponentProps, forwardRef } from "react";

import { Input } from "@shared/components/common/Input";

import { Field } from "./Field";
import { FieldControl } from "./FieldControl";
import { FieldDescription } from "./FieldDescription";
import { FieldLabel } from "./FieldLabel";
import { FieldMessage } from "./FieldMessage";

interface FieldInputProps extends ComponentProps<typeof Input> {
  label?: string;
  description?: string;
  isRequired?: boolean;
  error?: string;
}

export const FieldInput = forwardRef<HTMLInputElement, FieldInputProps>(
  (
    { label, description, isRequired, error, ...props }: FieldInputProps,
    ref
  ) => {
    return (
      <Field
        isRequired={isRequired}
        error={error}
      >
        {label && <FieldLabel isDisabled={props.disabled}>{label}</FieldLabel>}
        <FieldControl>
          <Input
            ref={ref}
            size="base"
            {...props}
          />
        </FieldControl>
        {!error && description && (
          <FieldDescription>{description}</FieldDescription>
        )}
        <FieldMessage />
      </Field>
    );
  }
);

FieldInput.displayName = "FieldInput";
