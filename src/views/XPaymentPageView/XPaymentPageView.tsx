"use client";
import {
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/PageHeader/PageHeader";
import Container from "@/components/ui-system/Container";
import FormikContainer from "./common/FormikContainer/FormikContainer";

function XPaymentPageView() {
  return (
    <Container>
      <div className="flex text-center flex-col items-center  mt-5">
        <PageHeaderHeading className="mb-6">
          <span className={"gradienteTitle"}>
            Track your payments on multiversx
          </span>
        </PageHeaderHeading>
        <PageHeaderDescription className="mb-10">
          Track your payments on multiversx
        </PageHeaderDescription>
      </div>
      <FormikContainer />
    </Container>
  );
}

export default XPaymentPageView;
