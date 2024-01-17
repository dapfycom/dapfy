"use client";
import { PageHeaderHeading } from "@/components/PageHeader/PageHeader";
import Loader1 from "@/components/ui-system/Loader/Loader1";
import { routeNames } from "@/config/routes";
import useAuthentication from "@/hooks/useAuthentication";
import { DrawerDialogDemo } from "@/views/AdminPanelView/common/Drawer";
import { Sidebar } from "@/views/AdminPanelView/common/Sidebar";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

const AdminLayoute = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { isAdmin } = useAuthentication();
  useEffect(() => {
    if (!isAdmin) {
      router.replace(routeNames.home);
    }
  }, [isAdmin, router]);

  if (!isAdmin) {
    return (
      <div className="my-10">
        <Loader1 iconSize="30px" />
      </div>
    );
  }
  return (
    <div>
      <PageHeaderHeading className="text-center my-6">
        Admin panel
      </PageHeaderHeading>
      <DrawerDialogDemo />
      <div className="border-t">
        <div className="bg-background">
          <div className="grid lg:grid-cols-5">
            <Sidebar className="hidden lg:block" />
            <div className="col-span-3 lg:col-span-4 lg:border-l min-h-[70vh]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayoute;
