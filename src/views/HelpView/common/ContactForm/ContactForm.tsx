"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/hooks/useRedux";
import { selectUserAddress } from "@/redux/dapp/dapp-slice";
import { addTicket } from "@/services/rest/dapfy-api/tickets";
import { ErrorMessage } from "@/utils/functions/error";
import { formatAddress } from "@/utils/functions/formatAddress";
import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { contactFormSchema } from "./schema";

const ContactForm = () => {
  const mountRef = useRef(false);
  const currentAddress = useAppSelector(selectUserAddress);
  const formik = useFormik({
    initialValues: {
      address: currentAddress,
      email: "",
      message: "",
    },
    onSubmit: (values) => {
      const { address, email, message } = values;
      toast.promise(addTicket({ email, address, msg: message }), {
        loading: "Loading...",
        success: () => {
          formik.resetForm();

          return "Thank you for contacting us! We will get back to you soon.";
        },
        error: (err) => ErrorMessage(err, "Error creating ticket"),
      });
    },
    validationSchema: contactFormSchema,
  });

  useEffect(() => {
    if (currentAddress && formik.values.address === "" && !mountRef.current) {
      mountRef.current = true;
      formik.setFieldValue("address", currentAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAddress, formik.values.address]);
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-8">
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium  ">
          Your email
        </label>
        <Input
          type="email"
          id="email"
          name="email"
          className="shadow-sm  border   text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5    "
          placeholder="name@gmail.com"
          required
          onChange={formik.handleChange}
        />
        {formik.errors.email && (
          <p className="text-red-500 text-sm mt-2">{formik.errors.email}</p>
        )}
      </div>
      <div>
        <label htmlFor="address" className="block mb-2 text-sm font-medium  ">
          Address
        </label>
        <Input
          type="text"
          id="address"
          name="address"
          className="block p-3 w-full text-sm   rounded-lg border  shadow-sm focus:ring-primary-500 focus:border-primary-500    "
          placeholder={formatAddress(
            "erd19f7d3rkajvuc3fmwsnt5thj60h8749hz2wcpax3l3jxnr2mspknsdhq8pm"
          )}
          required
          onChange={formik.handleChange}
          value={formik.values.address}
        />
        {formik.errors.address && (
          <p className="text-red-500 text-sm mt-2">{formik.errors.address}</p>
        )}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className="block mb-2 text-sm font-medium  ">
          Your message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className="block p-2.5 w-full text-sm   rounded-lg shadow-sm border  focus:ring-primary-500 focus:border-primary-500  dark:bg-transparent  "
          placeholder="Leave a comment..."
          onChange={formik.handleChange}
        ></textarea>
        {formik.errors.message && (
          <p className="text-red-500 text-sm mt-2">{formik.errors.message}</p>
        )}
      </div>
      <Button type="submit">Send message</Button>
    </form>
  );
};

export default ContactForm;
