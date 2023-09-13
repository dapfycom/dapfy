"use client";

import { Button } from "@/components/ui/button";
import { Dot, Zap } from "lucide-react";
import Image from "next/image";
import MobileNav from "../MobileNav/MobileNav";

const NavbarActions = () => {
  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button
        className="flex items-center gap-x-[4px] font-bold"
        variant={"outline"}
      >
        <Image src="/images/egld.svg" alt="" width={25} height={25} />
        <Dot size={20} className="text-green-500" /> MultiversX
      </Button>

      <Button
        className="hidden sx:flex md:flex items-center rounded-fullpx-4"
        variant={"outline"}
      >
        <Zap size={20} className="sm:mr-2" />
        <span className="hidden sm:inline">Connet</span>
      </Button>

      <MobileNav />

      {/* <ModeToggle /> */}
    </div>
  );
};

export default NavbarActions;
