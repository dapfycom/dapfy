import Filters from "../Filters";
import PaymentsTable from "../PaymentTable/PaymentsTable";
import TotalAmount from "../TotalAmount/TotalAmount";

const XPaymentContainer = () => {
  return (
    <div>
      {" "}
      <Filters />
      <TotalAmount />
      <PaymentsTable />
    </div>
  );
};

export default XPaymentContainer;
