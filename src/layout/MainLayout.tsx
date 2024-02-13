import FloatingHelpButton from "@/components/FloatingHelpButton/FloatingHelpButton";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { StrikeModal } from "@/components/StrikeModal/StrikeModal";
import { Toaster as ToasterShadcn } from "@/components/ui/toaster";
import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      <Toaster position="top-right" />
      <StrikeModal />
      <ToasterShadcn />
      <Footer />
      <FloatingHelpButton />
    </div>
  );
};

export default Layout;
