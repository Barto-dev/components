import { ReactNode } from "react";

interface FormProps {
  children: ReactNode;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
}

export const Form = ({
  children,
  onSubmit,
  className
}: FormProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(event);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={className}
    >
      {children}
    </form>
  );
};