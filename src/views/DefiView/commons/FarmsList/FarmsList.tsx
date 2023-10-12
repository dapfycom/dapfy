"use client";
import { useGetHatomFarms } from "../../utils/hooks";
import FarmComponent from "../DefiComponent/DefiComponent";

const FarmsList = () => {
  const hatomData = useGetHatomFarms();
  console.log("hatomData", hatomData);

  return (
    <div className="w-full">
      {hatomData.data.map((farm) => {
        return <FarmComponent key={farm.htokenI} hatomFarm={farm} />;
      })}
    </div>
  );
};

export default FarmsList;
