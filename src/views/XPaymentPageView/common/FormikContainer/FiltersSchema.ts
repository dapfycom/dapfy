import * as Yup from "yup";

export const FiltersFormSchema = Yup.object({
  from: Yup.date().required("A date of from is required."),
  to: Yup.date().required("A date of to is required."),
  sender: Yup.array(
    Yup.string().required("A sender is required.") // For arrays of strings, Yup does not directly support per-item error messages in the same way Zod does.
  ),
  receiver: Yup.array(
    Yup.string().required("A receiver is required.") // Similar to sender, for arrays of strings.
  ),
  type: Yup.string().required("A type is required."),
});
