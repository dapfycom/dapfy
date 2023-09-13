import Link from "next/link";

import MainNav from "@/components/MainNav/MainNav";
import NavbarActions from "@/components/NavActions/NavActions";
import Container from "@/components/ui-system/Container";

const Navbar = async () => {
  return (
    <div className="border-b">
      <Container>
        <div className="relative  sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-[-10px] flex gap-x-2">
            <p className="font-bold text-4xl">🔋</p>
          </Link>
          <MainNav />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
