"use client";

import useAuthentication from "@/hooks/useAuthentication";
import Home from "@/views/HomeView/Home";
import SwapAggregator from "@/views/SwapAggregator";

export default function HomePage() {
  const { isLoggedIn } = useAuthentication();
  return <>{isLoggedIn ? <SwapAggregator /> : <Home />}</>;
}
