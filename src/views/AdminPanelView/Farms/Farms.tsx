import AshFarms from "./AshFarms/AshFarms";
import HatomFarms from "./HatomFarms/HatomFarms";
import OnedexFarms from "./OnedexFarms/OnedexFarms";

const FarmsAdmin = () => {
  return (
    <div className="h-full px-4 py-6 lg:px-8 ">
      <OnedexFarms />

      <HatomFarms />

      <AshFarms />
    </div>
  );
};

export default FarmsAdmin;
