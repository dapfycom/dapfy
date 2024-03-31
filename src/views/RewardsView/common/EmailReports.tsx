import { UserPlusIcon } from "@/components/ui-system/icons/ui-icons";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useXAuthentication } from "@/hooks/useXAuthentication";
import {
  deleteEmailReport,
  saveEmailReport,
} from "@/services/rest/dapfy-api/rewards-report";
import { ErrorMessage } from "@/utils/functions/error";
import { useFormik } from "formik";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useGetUserEmailReport } from "../lib/tasks-hooks";

const EmailReports = () => {
  const { isAuthenticated, user } = useXAuthentication();
  const { emailReport, mutate } = useGetUserEmailReport();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      if (user?.id) {
        toast.promise(
          saveEmailReport(values.email, user.id),

          {
            loading: "Loading",
            success: () => {
              formik.resetForm();
              mutate();
              return "You now has a daily email with your rewards report";
            },
            error: (err) =>
              ErrorMessage(err, "Error when subscribing to daily report"),
          },
          {
            duration: 5000,
          }
        );
      }
    },
  });

  if (!isAuthenticated) {
    return null;
  }

  const handleDelete = (id: string) => {
    toast.promise(
      deleteEmailReport(id),
      {
        loading: "Loading",
        success: () => {
          mutate();
          return "You removed your daily email";
        },
        error: (err) => ErrorMessage(err, "Error when removing daily report"),
      },
      {
        duration: 5000,
      }
    );
  };

  return (
    <div className="w-full text-left max-w-xl mx-auto">
      <h4 className="text-2xl mb-2">Email reports</h4>
      <p className="text-muted-foreground mb-3">
        Send daily notifications when your rewards are ready to be claimed
      </p>

      <div className="w-full flex justify-center">
        <div className="w-full max-w-[600px] rounded bg-zinc-100 dark:bg-zinc-900 px-5 py-7">
          <div className="flex gap-2 mb-5">
            <Switch />
            <p>Send a daily email when my rewards are ready</p>
          </div>

          <div>
            <p className="mb-2">Daily report recipients</p>
            {emailReport.length > 0 && (
              <>
                {emailReport.map((report) => {
                  return (
                    <div
                      key={report.id}
                      className="flex w-full justify-between bg-zinc-200 dark:bg-zinc-800 px-2 mb-6 items-center rounded"
                    >
                      <div className="flex  w-full gap-2 items-center py-2 ">
                        <svg
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                        </svg>

                        <p>{report.email}</p>
                      </div>
                      <Button
                        variant={"ghost"}
                        onClick={() => handleDelete(report.id)}
                      >
                        <Trash2 className="text-red-500 " />
                      </Button>
                    </div>
                  );
                })}
              </>
            )}
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
              <div className="relative w-full">
                <label
                  htmlFor="user-email"
                  className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Email address
                </label>
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <input
                  className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  sm:rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter your email"
                  type="email"
                  id="user-email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  required
                />
              </div>
              <div className="ml-2">
                <Button className="bg-[#4f46e5] hover:text-[#4f46e5] text-white px-4 py-2 rounded-md flex items-center space-x-2">
                  <UserPlusIcon className="" />
                  <span className="whitespace-nowrap">Add recipient</span>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailReports;
