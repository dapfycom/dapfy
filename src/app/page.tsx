"use client";

import Swap from "@/views/SwapView/Swap";

export default function Home() {
  const commonProps = {
    callbackRoute: "dashboard",
    nativeAuth: true, // optional
  };
  return <Swap />;
}
