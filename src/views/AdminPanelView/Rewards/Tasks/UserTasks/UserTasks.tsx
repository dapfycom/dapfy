"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import FindUserForm from "./FindUserForm";

const UserTasks = () => {
  return (
    <>
      <Separator className="my-4" />
      <div className="flex items-center justify-between text-center sm:text-left sm:flex-row flex-col-reverse">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">User Tasks</h2>
          <p className="text-sm text-muted-foreground">
            You can manually change the tasks for the user
          </p>
        </div>
      </div>
      <div className="relative">
        <ScrollArea>
          <FindUserForm />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};

export default UserTasks;
