import { cva, type VariantProps } from "class-variance-authority";
import { ComponentProps, forwardRef, ReactNode } from "react";

import { cn } from "@shared/lib/utils/cn";

const inputStyles = cva(
  "flex w-full min-w-0 border bg-transparent border- placeholder:text- rounded- text- disabled:pointer-events-none disabled:cursor-not-allowed disabled:border- disabled:text- focus-visible:border- outline-none read-only:border- aria-[invalid=true]:border- hover:aria-[invalid=true]:border-",
  {
    variants: {
      size: {
        small: "px-4 py-1.5 text-sm leading-5",
        base: "px-4 py-3 text-sm leading-6",
        large: "px-4 py-3.5 text-base leading-6"
      }
    },
    defaultVariants: {
      size: "base"
    }
  }
);

interface InputProps extends Omit<ComponentProps<"input">, "size"> {
  startSlot?: ReactNode;
  endSlot?: ReactNode;
}

export type CustomInputProps = InputProps & VariantProps<typeof inputStyles>;

export const Input = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, type, startSlot, endSlot, size = "small", ...props }, ref) => {
    return (
      <div
        data-slot="input-container"
        className="relative h-fit w-full"
      >
        {startSlot && (
          <div
            data-slot="input-start-slot"
            className={cn(
              "absolute top-1/2 left-3 flex -translate-y-1/2 items-center",
              props.disabled &&
                "[&>svg]:cursor-not-allowed [&>svg]:text-gray-500"
            )}
          >
            {startSlot}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          data-slot="input"
          className={cn(
            inputStyles({ size }),
            type === "search" &&
              "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
            startSlot && "pl-10",
            endSlot && "pr-10",
            "aria-disabled:border- aria-disabled:text-",
            className
          )}
          {...props}
        />
        {endSlot && (
          <div
            data-slot="input-end-slot"
            className={cn(
              "absolute top-1/2 right-3 flex -translate-y-1/2 items-center",
              props.disabled &&
                "[&>svg]:cursor-not-allowed [&>svg]:text-"
            )}
          >
            {endSlot}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
