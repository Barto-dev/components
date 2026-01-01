import { ComponentProps, createContext, useContext, useId } from "react";

type FieldContextValue = {
  id: string;
  name?: string;
  isRequired?: boolean;
  error?: string;
  className?: string;
};

const FieldContext = createContext<FieldContextValue>({} as FieldContextValue);

interface FieldProps extends ComponentProps<"div"> {
  name?: string;
  isRequired?: boolean;
  error?: string;
}

const Field = ({
  name,
  isRequired,
  error,
  className,
  ...props
}: FieldProps) => {
  const id = useId();

  return (
    <FieldContext.Provider value={{ id, name, isRequired, error, className }}>
      <div
        data-slot="field"
        className={cn("group/input-hover flex flex-col gap-2", className)}
        {...props}
      />
    </FieldContext.Provider>
  );
};

const useField = () => {
  const context = useContext(FieldContext);

  if (!context) {
    throw new Error("useField should be used within <Field>");
  }

  const { id, isRequired, error, name } = context;

  return {
    id,
    isRequired,
    name,
    error,
    fieldItemId: `${id}-field-item`,
    fieldDescriptionId: `${id}-field-item-description`,
    fieldMessageId: `${id}-field-item-message`
  };
};

export { Field, FieldContext, useField };
