import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useGetPublicUserTasks } from "../hooks";
import FormTask from "./FormTask";

const FindUserForm = () => {
  const [xId, setXId] = useState("");
  const { userTasks } = useGetPublicUserTasks(xId);
  const handleXIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setXId(e.target.value);
  };

  return (
    <div>
      <Input
        placeholder="X identifier"
        value={xId}
        onChange={handleXIdChange}
      />
      <FormTask xId={xId} />
    </div>
  );
};

export default FindUserForm;
