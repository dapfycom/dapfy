import axiosDapfy from ".";

export const fetchIsUserUsedDapfyTool = async ({
  from,
  to,
  address,
}: {
  from: string;
  to: string;
  address: string;
}) => {
  const res = await axiosDapfy.post<{ data: boolean }>("/use-sc-tool", {
    from,
    to,
    address,
  });

  return res.data;
};
