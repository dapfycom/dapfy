import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { StrikeModal } from "@/components/StrikeModal/StrikeModal";
import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      <Toaster position="top-right" />
      <StrikeModal />
      <Footer />
    </div>
  );
};

export default Layout;
