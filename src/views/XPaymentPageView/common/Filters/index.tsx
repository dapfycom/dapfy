import Collapse from "@/components/Collapse/Collapse";
import { Button } from "@/components/ui/button";
import useDisclosure from "@/hooks/useDisclosure";
import { Filter } from "lucide-react";
import AddressFilter from "./AddressFilter";
import { CalendarFilter } from "./CalendarFilter";
import { TypeFilter } from "./TypeFilter";

const Filters = () => {
  const { isOpen, onOpen, onToggle } = useDisclosure(true);
  return (
    <div>
      <div className="w-full flex justify-center mb-6">
        <Button variant={"secondary"} className="gap-3" onClick={onToggle}>
          Filters <Filter size={"15px"} />
        </Button>
      </div>
      <Collapse isOpen={isOpen}>
        <div className=" grid grid-cols-2 gap-4">
          <CalendarFilter />
          <AddressFilter />
          <TypeFilter />
        </div>
      </Collapse>
    </div>
  );
};

export default Filters;
