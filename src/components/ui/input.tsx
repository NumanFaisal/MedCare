import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-full  border-input  px-3 py-2 text-base ring-offset-[#B7A9FF] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-0 focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-offset-1 border bg-transparent shadow-xs transition-[color,box-shadow] outline-none focus:border-primary placeholder:text-[#6C757D] border-gray-300  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }
