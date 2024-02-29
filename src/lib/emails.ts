import { externnalLinks, routeNames } from "@/config/routes";
import { Resend } from "resend";
import BuyEgldRampEmail from "../../react-email/emails/buy-egld-ramp";
import StreakFeatureEmail from "../../react-email/emails/streak-feature";
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
};

export const sendBuyEgldEmail = async (emails: string[]) => {
  const res = await resend.batch.send(
    emails.map((email: string) => {
      return {
        from: `dapfy.com <${process.env.EMAIL_HOST}>`,
        to: [email],
        subject: "Buy EGLD Faster & Cheaper",
        react: BuyEgldRampEmail({
          externnalLinks: externnalLinks,
          email: email,
        }),
      };
    })
  );
};
export const sendStreakFeatureEmail = async (emails: string[]) => {
  const res = await resend.batch.send(
    emails.map((email: string) => {
      return {
        from: `dapfy.com <${process.env.EMAIL_HOST}>`,
        to: [email],
        subject: " Introducing Strikes 💰",
        react: StreakFeatureEmail({
          externnalLinks: externnalLinks,
          email: email,
        }),
      };
    })
  );
};
