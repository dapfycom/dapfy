"use client";
import Loader1 from "@/components/ui-system/Loader/Loader1";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import useSWR from "swr";
import { InfoItem } from "../../Tickets/common/Dialogs/ShowUserInfoDialog";

const XUser = () => {
  const [userInput, setUserInput] = useState("");
  const [user, setUser] = useState("");

  const { data, error, isLoading } = useSWR(
    user ? `/api/xuser/${user}` : null,
    async () =>
      (
        await axiosDapfy.get<{
          user: {
            id: string;
            xid: string;
            username: string;
            name: string;
            profile_image_url: string;
            userId: string;
            updatedAt: string;
            user: {
              id: string;
              address: string;
              createdAt: string;
              updatedAt: string;
            };
          } | null;
        }>("/xuser", {
          params: {
            identifier: user,
          },
        })
      ).data
  );

  const handleSubmit = async () => {
    if (userInput) {
      setUser(userInput);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit">Show X User Info</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Paste X username</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              placeholder="Username"
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="secondary" onClick={handleSubmit}>
            Find
          </Button>
        </DialogFooter>

        <div>
          {isLoading ? (
            <Loader1 />
          ) : (
            <>
              {data && (
                <>
                  {data?.user ? (
                    <>
                      {data.user.profile_image_url && (
                        <Avatar className="hidden  md:flex uppercase">
                          <AvatarImage src={data.user.profile_image_url} />
                          <AvatarFallback>{data.user.name}</AvatarFallback>
                        </Avatar>
                      )}
                      <InfoItem label="User ID" value={data.user.user.id} />
                      <InfoItem
                        label="User address"
                        value={data.user.user.address}
                      />
                      <InfoItem label="X account name" value={data.user.name} />
                      <InfoItem
                        label="X account username"
                        value={data.user.username}
                      />
                      <InfoItem label="X account xid" value={data.user.xid} />

                      <InfoItem
                        label="Dapfy XAccount Id"
                        value={data.user.id}
                      />
                    </>
                  ) : (
                    <p>User not found</p>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default XUser;
