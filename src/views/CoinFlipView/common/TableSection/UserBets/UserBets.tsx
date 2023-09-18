"use client";
import { useGetUserBets } from "@/views/CoinFlipView/lib/hooks";
import BetsTable from "../Table/Table";

const UserBets = () => {
  const { bets } = useGetUserBets(50);

  return <BetsTable data={bets} />;
};

export default UserBets;
