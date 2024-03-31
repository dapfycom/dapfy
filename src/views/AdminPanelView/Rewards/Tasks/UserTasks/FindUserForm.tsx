import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useGetPublicUserTasks } from "../../hooks";
import FormTask from "./FormTask";

const FindUserForm = () => {
  const [xId, setXId] = useState("");
  const handleXIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setXId(e.target.value);
  };
  const { userTasks } = useGetPublicUserTasks(xId);

  return (
    <div>
      <Input
        placeholder="X identifier"
        value={xId}
        onChange={handleXIdChange}
      />
      {xId !== "" && userTasks && <FormTask xId={xId} userTasks={userTasks} />}
    </div>
  );
};

export default FindUserForm;
