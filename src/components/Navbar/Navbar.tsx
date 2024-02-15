"use client";
import Link from "next/link";

import EpochCountDown from "@/components/EpochCountDown/EpochCountDown";
import MainNav from "@/components/MainNav/MainNav";
import NavbarActions from "@/components/NavActions/NavActions";
import Container from "@/components/ui-system/Container";
import { routeNames } from "@/config/routes";
import useScrolled from "@/hooks/useScrolled";
import Image from "next/image";
import useBuyFromTradesilvania from "@/hooks/useBuyFromTradesilvania";

const Navbar = () => {
  const hasScrolled = useScrolled();
  useBuyFromTradesilvania();

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
        className={` fixed z-10 top-0 left-0 right-0 py-2 ${
          hasScrolled
            ? "bg-[rgba(255,255,255,0.85)] dark:bg-[rgba(0,0,0,0.75)]"
            : ""
        } before:backdrop-opacity-100 before:w-full before:h-full before:absolute  `}
      >
        {/* {!isOpen && <PishingWarn close={onToggle} />} */}

        <Container className="relative z-20">
          <div className="relative  sm:px-6 lg:px-8 flex h-16 items-center">
            <Link href={routeNames.home} className="ml-[-10px] flex gap-x-2">
              <p className="font-bold text-4xl">
                <Image
                  src={"/images/logo-white.png"}
                  alt="logo"
                  width={40}
                  height={40}
                  className="hidden dark:block"
                />
                <Image
                  src={"/images/logo-black.png"}
                  alt="logo"
                  width={40}
                  height={40}
                  className="block dark:hidden"
                />
              </p>
            </Link>
            <MainNav className="mx-6 hidden xl:flex" />
            <NavbarActions />
          </div>
        </Container>
      </header>

      <div className={"pt-6"}>
        <EpochCountDown />
      </div>
    </>
  );
};

export default Navbar;
