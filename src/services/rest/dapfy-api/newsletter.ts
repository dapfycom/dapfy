import axiosDapfy from ".";

export const deleteEmail = async (id: string) => {
  return await axiosDapfy.delete(`/newsletter/${id}`);
};

export const sendWelcomeEmail = async (email: string, token: string) => {
  return await axiosDapfy.post("/email", { email, token });
};
