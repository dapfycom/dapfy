import { subDays } from "date-fns";
import { Formik } from "formik";
import XPaymentContainer from "../XPaymentContainer/XPaymentContainer";
import { FiltersFormSchema } from "./FiltersSchema";
export interface IFormValues {
  from: Date;
  to: Date;
  sender: string;
  receiver: string;
  type: "egld" | "esdt" | "all";
}

const FormikContainer = () => {
  const initialData: IFormValues = {
    from: subDays(new Date(), 30),
    to: new Date(),
    sender: "",
    receiver: "",
    type: "egld",
  };

  return (
    <Formik
      initialValues={initialData}
      validationSchema={FiltersFormSchema}
      onSubmit={(values, actions) => {
        console.log(values);
        actions.setSubmitting(false);
      }}
    >
      <XPaymentContainer />
    </Formik>
  );
};

export default FormikContainer;
