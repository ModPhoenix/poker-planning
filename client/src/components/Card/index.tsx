import { FC } from "react";

import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Card: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <Button
      className={cn(
        "h-20 min-w-[52px] text-xl py-6 px-3 border-2 leading-normal",
        className,
      )}
      variant="outline"
      {...props}
    >
      {children}
    </Button>
  );
};
