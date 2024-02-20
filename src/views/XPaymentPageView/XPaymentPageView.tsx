import {
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/PageHeader/PageHeader";
import Container from "@/components/ui-system/Container";
import PaymentsTable from "./common/PaymentsTable";

function XPaymentPageView() {
  return (
    <Container>
      <div className="flex flex-col items-center  mt-5">
        <PageHeaderHeading className="mb-6">
          <span className={"gradienteTitle"}>
            Track your payments on multiversx
          </span>
        </PageHeaderHeading>
        <PageHeaderDescription className="mb-10">
          Track your payments on multiversx
        </PageHeaderDescription>
        <PaymentsTable />
      </div>
    </Container>
  );
}

export default XPaymentPageView;
