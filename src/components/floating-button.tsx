import { Button } from "./ui/button";
import { PlusIcon } from "@heroicons/react/24/solid";

export function FloatingButton() {
    return (
        <Button
          className="fixed bottom-8 right-8 text-white p-4 rounded-full shadow-lg transition"
          aria-label="Add"
        >
          <PlusIcon className="h-6 w-6" />
        </Button>
      );
}