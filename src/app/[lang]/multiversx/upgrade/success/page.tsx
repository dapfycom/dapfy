"use client";
import { routeNames } from "@/config/routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Success = () => {
  const router = useRouter();
  useEffect(() => {
    router.push(routeNames.upgrade + "?status=success");
  }, []);
  return <></>;
};

export default Success;
