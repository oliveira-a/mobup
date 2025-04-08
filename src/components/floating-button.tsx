import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { PlusIcon } from "@heroicons/react/24/solid";

export function FloatingButton(
  {onClick, className} : {
  onClick: React.MouseEventHandler<HTMLButtonElement>, className?: string | string[]}) {
    return (
        <Button
          className={cn("fixed", "bottom-8", "right-8", "text-white", "p-4", "rounded-full", "shadow-lg", "transition", className)}
          aria-label="Add"
          onClick={onClick}
        >
          <PlusIcon className="h-6 w-6" />
        </Button>
      );
}