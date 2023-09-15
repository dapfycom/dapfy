"use client";

export default function Home() {
  const commonProps = {
    callbackRoute: "dashboard",
    nativeAuth: true, // optional
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello Hello Hello
    </main>
  );
}
