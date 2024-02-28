import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { PropsWithChildren } from "react";

interface IProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  title?: string;
  description?: string;
}
const MobileDrawer = ({
  isOpen,
  onOpenChange,
  children,
  onClose,
  description,
  title,
}: PropsWithChildren<IProps>) => {
  return (
    <Drawer onOpenChange={onOpenChange} open={isOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            {title && <DrawerTitle>{title}</DrawerTitle>}

            {description && (
              <DrawerDescription>{description}</DrawerDescription>
            )}
          </DrawerHeader>
          <div className="p-4 pb-0">{children}</div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileDrawer;
