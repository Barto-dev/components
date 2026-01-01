import { ComponentProps, forwardRef } from "react";

import { Input } from "./Input";

import { FormItem, useFormField } from "./Form";
import { FormControl } from "./FormControl";
import { FormDescription } from "./FormDescription";
import { FormLabel } from "./FormLabel";
import { FormMessage } from "./FormMessage";

interface FormInputProps extends ComponentProps<typeof Input> {
  label?: string;
  description?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, description, ...props }: FormInputProps, ref) => {
    const { error } = useFormField();
    return (
      <FormItem>
        {label && <FormLabel isDisabled={props.disabled}>{label}</FormLabel>}
        <FormControl>
          <Input
            ref={ref}
            size="base"
            {...props}
          />
        </FormControl>
        {!error?.message && description && (
          <FormDescription>{description}</FormDescription>
        )}
        <FormMessage />
      </FormItem>
    );
  }
);

FormInput.displayName = "FormInput";
