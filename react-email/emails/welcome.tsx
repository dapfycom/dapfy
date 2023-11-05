import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface KoalaWelcomeEmailProps {
  externnalLinks: {
    twitter: string;
    telegram: string;
    github: string;
    instagram: string;
    facebook: string;
    linkedin: string;
  };
  internalLinks: {
    farm: string;
    play: string;
    dust: string;
    aggregator: string;
    defi: string;
    rewards: string;
  };
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const KoalaWelcomeEmail = ({
  externnalLinks = {
    facebook: "",
    github: "",
    instagram: "",
    linkedin: "",
    telegram: "",
    twitter: "",
  },

  internalLinks = {
    aggregator: "",
    defi: "",
    dust: "",
    farm: "",
    play: "",
    rewards: "",
  },
}: KoalaWelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>The platform that helps you simplify DeFi</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`https://dapfy.com/_next/image?url=%2Fimages%2Flogo-v2-black.png&w=256&q=75`}
          width="170"
          height="50"
          alt="Dapfy"
          style={logo}
        />
        <Text style={paragraph}>
          We’re incredibly excited to have you here with us!
        </Text>
        <Text style={paragraph}>
          DeFi can be very complex, but we’re making it simple.
        </Text>
        <Text style={paragraph}>
          Dapfy automates your DeFi experience, offering easy-to-use tools and
          strategies that make navigating the decentralized economy effortless.
        </Text>

        <Section>
          <Row
            style={{
              margin: "10px 0",
            }}
          >
            <Column>
              <Link
                href={internalLinks.aggregator}
                target="_blank"
                rel="noopener noreferrer"
              >
                - Swap Aggregator: Optimal trade rates across DEXs.
              </Link>
            </Column>
          </Row>
          <Row
            style={{
              margin: "10px 0",
            }}
          >
            <Column>
              <Link
                href={internalLinks.farm}
                target="_blank"
                rel="noopener noreferrer"
              >
                - Farming: Stake crypto to earn rewards.
              </Link>
            </Column>
          </Row>

          <Row
            style={{
              margin: "10px 0",
            }}
          >
            <Column>
              <Link
                href={internalLinks.play}
                target="_blank"
                rel="noopener noreferrer"
              >
                - On-Chain Gaming: Blockchain games with verified transactions.
              </Link>
            </Column>
          </Row>

          <Row
            style={{
              margin: "10px 0",
            }}
          >
            <Column>
              <Link
                href={internalLinks.dust}
                target="_blank"
                rel="noopener noreferrer"
              >
                - Dust Converter: Combines small crypto balances into one
                currency.
              </Link>
            </Column>
          </Row>

          <Row
            style={{
              margin: "10px 0",
            }}
          >
            <Column>
              <Link
                href={internalLinks.defi}
                target="_blank"
                rel="noopener noreferrer"
              >
                - Pre-Configured DeFi Strategies: Automated DeFi investment
                management.
              </Link>
            </Column>
          </Row>
          <Row
            style={{
              margin: "10px 0",
            }}
          >
            <Column>
              <Link
                href={internalLinks.rewards}
                target="_blank"
                rel="noopener noreferrer"
              >
                - Rewards Center: Earn rewards for platform engagement.
              </Link>
            </Column>
          </Row>
        </Section>

        <Text style={paragraph}>
          Your passion for DeFi is our passion, and together, we&apos;re not
          just building a platform; we&apos;re cultivating a community where
          everyone has a place, including you.{" "}
        </Text>

        <Section style={btnContainer}>
          <Button pX={12} pY={12} style={button} href="https://dapfy.com">
            Get started
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          The Dapfy Team
        </Text>
        <Hr style={hr} />
        <Section
          style={{
            fontSize: "14px",
          }}
        >
          <Text>
            P.S. Don’t miss out – join us on all our social platforms. Connect
            with us on Twitter, Facebook, Instagram, and LinkedIn for the latest
            updates.
          </Text>
          <Text>Follow us, tag us, and be a part of the conversation. </Text>
        </Section>
        <Section>
          <Link
            style={footerLink}
            href={externnalLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow us on Instagram
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            style={footerLink}
            href={externnalLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            Connect on LinkedIn
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            style={footerLink}
            href={externnalLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            Join our Facebook Community
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            style={footerLink}
            href={externnalLinks.telegram}
            target="_blank"
            rel="noopener noreferrer"
          >
            Stay Updated on Telegram
          </Link>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default KoalaWelcomeEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const toolsContainer = {
  display: "flex",
  flexDirection: "column",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};

const footerLink = {
  color: "#b7b7b7",
  textDecoration: "underline",
};
