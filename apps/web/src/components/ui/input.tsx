import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Figma: input (20:1025). Texto Medium 16.8, placeholder Italic 14, raio 4.
 * state=danger via aria-invalid. Estados sucess/info/warning: usar Message abaixo do campo.
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-sm border border-input bg-background px-4 text-base font-medium text-foreground",
        "placeholder:text-sm placeholder:font-normal placeholder:italic placeholder:text-muted-foreground",
        "hover:bg-state-hover/40 disabled:cursor-not-allowed disabled:opacity-[var(--disabled-opacity)]",
        "aria-invalid:border-2 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
