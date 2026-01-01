import { ComponentProps } from "react";

import { useField } from "./Field";

export const FieldDescription = ({
  className,
  ...props
}: ComponentProps<"p">) => {
  const { fieldDescriptionId } = useField();

  return (
    <p
      data-slot="field-description"
      id={fieldDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
};
