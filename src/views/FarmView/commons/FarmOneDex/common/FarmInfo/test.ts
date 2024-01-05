import { fetchScSimpleData } from "@/services/sc/queries";

const getData = async () => {
  const queryResponse = await fetchScSimpleData("originalOneDexWsp:viewPairs");

  console.log(queryResponse);
};

getData();
