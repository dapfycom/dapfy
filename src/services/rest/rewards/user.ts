import axiosRewards from ".";

export const fetchConnectedXUser = async () => {
  const { data } = await axiosRewards.get("auth/user", {
    withCredentials: true,
  });

  console.log(data);

  return data;
};
