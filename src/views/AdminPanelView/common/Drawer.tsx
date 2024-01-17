import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Sidebar } from "./Sidebar";

export function DrawerDialogDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <div className="flex justify-center w-full mb-4  lg:hidden">
        <DrawerTrigger asChild>
          <Button variant="outline">⌘</Button>
        </DrawerTrigger>
      </div>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>
        <Sidebar className="px-4" noTitle />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
