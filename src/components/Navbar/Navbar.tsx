"use client";
import Link from "next/link";

import EpochCountDown from "@/components/EpochCountDown/EpochCountDown";
import MainNav from "@/components/MainNav/MainNav";
import NavbarActions from "@/components/NavActions/NavActions";
import Container from "@/components/ui-system/Container";
import useScrolled from "@/hooks/useScrolled";

const Navbar = () => {
  const hasScrolled = useScrolled();
  console.log("render");

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
        className={` fixed top-0 left-0 right-0 ${
          hasScrolled ? "bg-[rgba(0,0,0,.5)]" : ""
        } before:backdrop-opacity-100 before:w-full before:h-full before:absolute  `}
      >
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

      <EpochCountDown />
    </>
  );
};

export default Navbar;
