import Collapse from "@/components/Collapse/Collapse";
import MobileDrawer from "@/components/MobileDrawer/MobileDrawer";
import { Button } from "@/components/ui/button";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import useDisclosure from "@/hooks/useDisclosure";
import { Filter } from "lucide-react";
import AddressFilter from "./AddressFilter";
import { CalendarFilter } from "./CalendarFilter";
import { TypeFilter } from "./TypeFilter";

const Filters = () => {
  const { isOpen, onOpen, onToggle, onClose } = useDisclosure(true);
  const windowSize = useBreakpoint();
  return (
    <div>
      <div className="w-full flex justify-center mb-6">
        <Button variant={"secondary"} className="gap-3" onClick={onToggle}>
          Filters <Filter size={"15px"} />
        </Button>
      </div>

      <div className="hidden sm:block">
        <Collapse isOpen={isOpen}>
          <div className=" grid md:grid-cols-2 gap-4">
            <CalendarFilter />
            <AddressFilter />
            <TypeFilter />
          </div>
        </Collapse>
      </div>

      {windowSize <= 640 && (
        <div className="block sm:hidden">
          <MobileDrawer
            isOpen={isOpen}
            onOpenChange={(open) => (open ? onOpen : onClose)}
            onClose={onClose}
            title="Filters"
            description="Set track preferences."
          >
            <div className=" grid md:grid-cols-2 gap-4">
              <CalendarFilter />
              <AddressFilter />
              <TypeFilter />
            </div>
          </MobileDrawer>
        </div>
      )}
    </div>
  );
};

export default Filters;
