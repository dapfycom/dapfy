import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { PropsWithChildren, useEffect } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;
