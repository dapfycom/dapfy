import axiosDapfy from ".";

export const writeTweet = async (text: string) => {
  const res = await axiosDapfy.post("/tweet", { text });

  return res.data;
};
