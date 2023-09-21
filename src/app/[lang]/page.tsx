"use client";

import useAuthentication from "@/hooks/useAuthentication";
import Home from "@/views/HomeView/Home";
import Swap from "@/views/SwapView/Swap";

export default function HomePage() {
  const { isLoggedIn } = useAuthentication();
  return <>{isLoggedIn ? <Swap /> : <Home />}</>;
}
