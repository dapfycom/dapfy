import axiosDapfy from ".";

export const addTicket = async ({
  email,
  msg,
  address,
}: {
  email: string;
  msg: string;
  address: string;
}) => {
  const res = await axiosDapfy.post("/help/new-ticket", {
    email,
    message: msg,
    address,
  });

  return res.data;
};
