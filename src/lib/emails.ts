import { externnalLinks, routeNames } from "@/config/routes";
import { Resend } from "resend";
import TicketReplyEmail from "../../react-email/emails/ticket-replay";
import KoalaWelcomeEmail from "../../react-email/emails/welcome";

const resend = new Resend(process.env.RESEND_API_KEY);
export const sendWelcomeEmail = async (email: string) => {
  await resend.emails.send({
    from: `dapfy.com <${process.env.EMAIL_HOST}>`,
    to: [email],
    subject: "Welcome to Dapfy 🎉",
    react: KoalaWelcomeEmail({
      externnalLinks: externnalLinks,
      internalLinks: routeNames,
      email: email,
    }),
    text: "Welcome to Dapfy 🎉",
  });
};

export const sendTicketReplayEmail = async (email: string, message: string) => {
  try {
    const res = await resend.emails.send({
      from: `dapfy.com <${process.env.EMAIL_HOST}>`,
      to: [email],
      subject: "Response about your open ticket on Dapfy",
      react: TicketReplyEmail({
        externnalLinks: externnalLinks,
        email: email,
        message: message,
      }),
      text: message,
    });
    console.log({ emailRes: res });
    return res;
  } catch (error) {
    console.log(error);
  }
};
