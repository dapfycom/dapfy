"use client";
import Link from "next/link";

import boberImg from "@/assets/images/coins/bober.jpg";
import EpochCountDown from "@/components/EpochCountDown/EpochCountDown";
import MainNav from "@/components/MainNav/MainNav";
import NavbarActions from "@/components/NavActions/NavActions";
import Container from "@/components/ui-system/Container";
import { adminRoutes, routeNames } from "@/config/routes";
import useBuyFromTradesilvania from "@/hooks/useBuyFromTradesilvania";
import useScrolled from "@/hooks/useScrolled";
import Image from "next/image";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const hasScrolled = useScrolled();
  const pathname = usePathname();
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
                  src={boberImg}
                  alt="logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </p>
            </Link>
            <MainNav className="mx-6 hidden xl:flex" />
            <NavbarActions />
          </div>
        </Container>
      </header>

      {!adminRoutes.map((route) => route.path).includes(pathname) && (
        <div className={"pt-6"}>
          <EpochCountDown />
        </div>
      )}
    </>
  );
};

export default Navbar;
