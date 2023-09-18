import ReduxProvider from "./redux/ReduxProvider";
import SdkProvider from "./sdk-dapp/SdkProvider";
import { ThemeProvider } from "./theme-provider/ThemeProvider";

export default function RootProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <SdkProvider>{children}</SdkProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}
