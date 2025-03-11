import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  error?: string;
  asChild?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, iconLeft, iconRight, error, asChild, className, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "input";

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}
        <div
          className={cn(
            "flex items-center gap-2 border rounded-md px-3 py-2 transition-all",
            "focus-within:ring-2 focus-within:ring-blue-500",
            error ? "border-red-500" : "border-gray-300",
            props.disabled && "opacity-50 cursor-not-allowed",
            className
          )}
        >
          {iconLeft && <span className="text-gray-500">{iconLeft}</span>}
          <Comp
            ref={ref}
            className="flex-1 outline-none bg-transparent"
            {...props}
          />
          {iconRight && <span className="text-gray-500">{iconRight}</span>}
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };
