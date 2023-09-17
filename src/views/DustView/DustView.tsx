import MoonDustXCard from "./components/ConvertCard/MoonDustXCard";
import DustHeading from "./components/DustHeading/DustHeading";

const DustView = () => {
  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <DustHeading />

        <div className="max-w-[750px] w-4/5">
          <MoonDustXCard />
        </div>
      </div>
    </>
  );
};

export default DustView;
