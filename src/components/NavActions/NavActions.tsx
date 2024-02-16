"use client";

import Login from "@/components/Login/Login";
import { Button } from "@/components/ui/button";
import { Dot } from "lucide-react";
import Image from "next/image";
import BuyEgldButton from "../BuyEgldButton/BuyEgldButton";
import MobileNav from "../MobileNav/MobileNav";
import { ModeToggle } from "../ModeToggle/ModeToggle";

const NavbarActions = () => {
  return (
    <div className="ml-auto flex items-center gap-x-2 md:gap-x-4">
      <div className="hidden sm:block">
        <BuyEgldButton />
      </div>

      <Button
        className="hidden items-center gap-x-[4px] sm:flex"
        variant={"outline"}
      >
        <Image src="/images/egld.svg" alt="" width={22} height={22} />
        <Dot size={20} className="text-green-500" /> MultiversX
      </Button>

      {/* <div className="hidden sm:block">
        <LanguageSelector />
      </div> */}

      <div className="hidden sm:block">
        <ModeToggle />
      </div>
      <Login />

      <MobileNav />
    </div>
  );
};

export default NavbarActions;
