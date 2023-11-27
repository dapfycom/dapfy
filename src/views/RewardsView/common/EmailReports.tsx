import { Switch } from "@/components/ui/switch";
import { useFormik } from "formik";
import { Trash2 } from "lucide-react";
import React from "react";

const EmailReports = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {},
  });
  return (
    <div className="w-full text-left">
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
            <div className="flex w-full justify-between bg-zinc-200 dark:bg-zinc-800 px-2 mb-6 items-center rounded">
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

                <p>cesrmat@gmail.com</p>
              </div>

              <Trash2 className="text-red-500" />
            </div>
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
                  className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Enter your email"
                  type="email"
                  id="user-email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="py-3 px-5 w-full text-sm font-medium text-center rounded-lg border cursor-pointer bg-primary-700 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailReports;
