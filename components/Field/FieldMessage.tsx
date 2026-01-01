import { ComponentProps } from "react";

import { useField } from "./Field";

export const FieldMessage = ({ className, ...props }: ComponentProps<"p">) => {
  const { error, fieldMessageId } = useField();

  const body = error || props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="field-message"
      id={fieldMessageId}
      className={cn("text-error-400 text-sm", className)}
      {...props}
    >
      {body}
    </p>
  );
};
