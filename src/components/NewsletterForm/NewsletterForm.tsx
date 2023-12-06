"use client";
import axiosDapfy from "@/services/rest/dapfy-api";
import { ErrorMessage } from "@/utils/functions/error";
import { useFormik } from "formik";
import toast from "react-hot-toast";

const NewsletterForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      toast.promise(
        axiosDapfy.post("/newsletter", {
          email: values.email,
        }),
        {
          loading: "Loading",
          success: () => {
            formik.resetForm();

            return "📧 We sent you an email - Check your inbox to confirm the subscription (including the spam folder)";
          },
          error: (err) => ErrorMessage(err, "Error when subscribing"),
        },
        {
          duration: 5000,
        }
      );
    },
  });

  return (
    <section className="">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center">
          <p className="mx-auto mb-8 max-w-xl font-light text-gray-500 md:mb-12  dark:text-gray-400">
            Stay up to date with the roadmap progress, announcements, and
            exclusive discounts; sign up with your email to get started.
          </p>
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
                  className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
    </section>
  );
};

export default NewsletterForm;
