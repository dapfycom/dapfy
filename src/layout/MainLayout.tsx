import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  // const pathname = usePathname();

  // const { isLoggedIn } = useGetLoginInfo();

  // const location = pathname;

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     dispatch(openLogin(false));
  //   }
  // }, [isLoggedIn, dispatch]);

  // const showFooter =
  //   location !== routeNames.swap && location !== routeNames.swapLp;
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      {/* <Box
        sx={{
          "& >div": {
            pt: "70px",
          },
        }}
        >
        {children}
        </Box> */}
      <Footer />
    </div>
  );
};

export default Layout;
