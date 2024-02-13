import { addressIsValid } from "@/lib/utils";
import * as yup from "yup";

export const contactFormSchema = yup.object({
  address: yup
    .string()
    .required("Address is a required field")
    .test("is-valid-address", "Address is not valid", (value) =>
      addressIsValid(value)
    ),

  email: yup.string().email().required("Email is a required field"),
  message: yup.string().required("Message is a required field"),
});
