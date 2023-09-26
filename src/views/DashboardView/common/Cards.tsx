import LanguageCard from "./LanguageCard";
import SlippageCard from "./SlippageCard";
const Cards = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* <BskCard /> */}
      {/* <EgldCard /> */}
      <LanguageCard />
      <SlippageCard />
    </div>
  );
};

export default Cards;
