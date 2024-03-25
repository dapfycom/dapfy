import { fetchAxiosDapfy } from "@/services/rest/dapfy-api";
import useSWR from "swr";

const useGetRewardsDapfyPubicTasks = () => {
  const { data, error, isLoading } = useSWR("/task", fetchAxiosDapfy);

  return {
    tasks: [
      {
        _id: "6600502d85afdc0b7be541af",
        user_id: "2488588224",
        mention: true,
        comment: true,
        like: true,
        rt: true,
        defi: false,
        __v: 0,
      },
      {
        _id: "660051b385afdc0b7be541f1",
        user_id: "1062718844417007616",
        mention: false,
        comment: false,
        like: true,
        rt: true,
        defi: false,
        __v: 0,
      },
      {
        _id: "660051b385afdc0b7be541fd",
        user_id: "1405991150834552835",
        mention: false,
        comment: false,
        like: true,
        rt: false,
        defi: false,
        __v: 0,
      },
      {
        _id: "6600578f85afdc0b7be54400",
        user_id: "2866530713",
        mention: true,
        comment: true,
        like: true,
        rt: true,
        defi: false,
        __v: 0,
      },
      {
        _id: "660057e985afdc0b7be54408",
        user_id: "1626142425440743424",
        mention: true,
        comment: true,
        like: true,
        rt: true,
        defi: false,
        __v: 0,
      },
      {
        _id: "660058f785afdc0b7be54412",
        user_id: "1255774601671557120",
        mention: true,
        comment: true,
        like: true,
        rt: true,
        defi: false,
        __v: 0,
      },
    ],
    isLoading,
    error,
  };
};

export default useGetRewardsDapfyPubicTasks;
