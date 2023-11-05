import { externnalLinks } from "@/config/routes";
import { Resend } from "resend";
import KoalaWelcomeEmail from "../../react-email/emails/welcome";

const resend = new Resend(process.env.RESEND_API_KEY);
export const sendWelcomeEmail = async (email: string) => {
  await resend.emails.send({
    from: "Dapfy <onboarding@pinocli.com>",
    to: [email],
    subject: "Welcome to Dapfy 🎉",
    react: KoalaWelcomeEmail({ externnalLinks: externnalLinks }),
    text: "Hello world",
  });
};
