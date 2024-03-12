import { useGetUserGamesHistory } from "../../utils/hooks";
import HistoryTable from "../HistoryTable/HistoryTable";

const UserGamesHistory = () => {
  const { history } = useGetUserGamesHistory();
  return <HistoryTable data={history} />;
};

export default UserGamesHistory;
