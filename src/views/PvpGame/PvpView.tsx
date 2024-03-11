"use client";
import Container from "@/components/ui-system/Container";
import {
  useGetActiveGames,
  useGetUserActiveGames,
} from "@/views/PvpGame/utils/hooks";
import { createGame } from "@/views/PvpGame/utils/services";
import { useFormik } from "formik";
import * as yup from "yup";
import ActiveGames from "./components/ActiveGames/ActiveGames";
import CreateGame from "./components/CreateGame/CreateGame";
import Heading from "./components/Heading/Heading";
import MyGames from "./components/MyGames/MyGames";
import Stats from "./components/Stats/Stats";

const PvpView = () => {
  const { games } = useGetActiveGames();
  const { games: userGames } = useGetUserActiveGames();

  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    onSubmit: (values) => {
      createGame(Number(values.amount), "firulaus", "EGLD", 18);
    },

    validationSchema: yup.object().shape({
      amount: yup.number().required("Required"),
    }),
  });

  return (
    <Container>
      <div className="h-screen  p-8 flex flex-col items-center">
        <Heading />
        <Stats />

        <CreateGame />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          <ActiveGames />
          <MyGames />
        </div>
      </div>
    </Container>
  );
};

export default PvpView;
