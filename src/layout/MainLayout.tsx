import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      <Toaster position="top-right" />
      <Footer />
    </div>
  );
};

export default Layout;
