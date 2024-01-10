"use client";
import Image from "next/image";
import FarmsList from "./FarmsList/FarmsList";

const HatomFarms = () => {
  return (
    <div className="my-6">
      <div className="mb-4">
        <Image
          src={"/images/hatom-text-white.png"}
          alt="hatom"
          width={80}
          height={26}
          className="hidden dark:block"
        />
        <Image
          src={"/images/hatom-text-black.png"}
          alt="hatom"
          width={80}
          height={26}
          className="block dark:hidden"
        />
      </div>
      <FarmsList />
    </div>
  );
};

export default HatomFarms;
