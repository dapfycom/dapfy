import axiosDapfy from ".";

export const getUserEmailsReport = async (
  xid: string
): Promise<{
  reports: {
    id: string;
    xAccountId: string;
    email: string;
  }[];
}> => {
  const res = await axiosDapfy.get(`/rewards-report`, {
    params: {
      xid,
    },
  });

  return res.data;
};

export const saveEmailReport = async (email: string, xid: string) => {
  return await axiosDapfy.post("/rewards-report", { email, xid });
};

export const deleteEmailReport = async (id: string) => {
  return await axiosDapfy.delete("/rewards-report", {
    params: {
      id,
    },
  });
};
