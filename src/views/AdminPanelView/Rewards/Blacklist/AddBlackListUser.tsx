"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosDapfy from "@/services/rest/dapfy-api";
import { useState } from "react";
import toast from "react-hot-toast";
import { mutate } from "swr";

const AddBlackListUser = () => {
  const [userInput, setUserInput] = useState("");
  const [identifierInput, setIdentifierInput] = useState("");

  const handleSubmit = async () => {
    if (userInput || identifierInput) {
      let promise;
      if (userInput) {
        promise = axiosDapfy.post("/xuser/blacklist", {
          username: userInput,
          xid: "",
        });
        setUserInput("");
      }
      if (identifierInput) {
        promise = axiosDapfy.post("/xuser/blacklist", {
          username: "",
          xid: identifierInput,
        });
        setIdentifierInput("");
      }

      toast.promise(promise!, {
        loading: "Adding user to blacklist...",
        success: () => {
          mutate("/xuser/blacklist");

          return "User added to blacklist";
        },
        error: "Failed to add user to blacklist",
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit">Add user</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Black list user</DialogTitle>
        </DialogHeader>
        <div className="mt-5 flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              placeholder="Username"
              onChange={(e) => setUserInput(e.target.value)}
              disabled={identifierInput.length > 0}
              value={userInput}
            />
          </div>
        </div>

        <p className="text-center">OR</p>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              placeholder="Identifier"
              onChange={(e) => setIdentifierInput(e.target.value)}
              disabled={userInput.length > 0}
              value={identifierInput}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="secondary" onClick={handleSubmit}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBlackListUser;
