import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, error, label, ...props }: React.ComponentProps<"input"> & { error?: string, label?: string }) {
  return (
    <div className="flex flex-col">
      {label && <label htmlFor={label} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input
        id={label}
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          error
            ? "border-destructive ring-destructive/20 focus-visible:ring-destructive/50"
            : "",
          className
        )}
        {...props}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  )
}

export { Input }
