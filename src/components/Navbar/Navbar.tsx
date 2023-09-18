"use client";
import Link from "next/link";

import EpochCountDown from "@/components/EpochCountDown/EpochCountDown";
import MainNav from "@/components/MainNav/MainNav";
import NavbarActions from "@/components/NavActions/NavActions";
import Container from "@/components/ui-system/Container";
import useDisclosure from "@/hooks/useDisclosure";
import useScrolled from "@/hooks/useScrolled";
import PishingWarn from "../PishingWarn/PishingWarn";

const Navbar = () => {
  const hasScrolled = useScrolled();
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <header
        style={
          hasScrolled
            ? {
                boxShadow: "inset 0 -1px 0 0 hsla(0,0%,100%,.1)",
              }
            : {}
        }
        className={` fixed z-10 top-0 left-0 right-0 ${
          hasScrolled ? "bg-[rgba(0,0,0,0.75)]" : ""
        } before:backdrop-opacity-100 before:w-full before:h-full before:absolute  `}
      >
        {!isOpen && <PishingWarn close={onToggle} />}

        <Container className="relative z-20">
          <div className="relative  sm:px-6 lg:px-8 flex h-16 items-center">
            <Link href="/" className="ml-[-10px] flex gap-x-2">
              <p className="font-bold text-4xl">🔋</p>
            </Link>
            <MainNav className="mx-6 hidden md:flex" />
            <NavbarActions />
          </div>
        </Container>
      </header>

      <div
        style={{
          paddingTop: !isOpen ? "56px" : 0,
        }}
      >
        <EpochCountDown />
      </div>
    </>
  );
};

export default Navbar;
