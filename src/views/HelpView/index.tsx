import {
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/PageHeader/PageHeader";
import ContactForm from "./common/ContactForm/ContactForm";

const HelpView = () => {
  return (
    <section className="">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <div className="text-center">
          <PageHeaderHeading className="mb-6">
            <span className={"gradienteTitle"}>Contact Us</span>
          </PageHeaderHeading>
          <PageHeaderDescription className="mb-10">
            Got a technical issue? Want to send feedback about a beta feature?
            Let us know.{" "}
          </PageHeaderDescription>
        </div>

        <ContactForm />
      </div>
    </section>
  );
};

export default HelpView;
