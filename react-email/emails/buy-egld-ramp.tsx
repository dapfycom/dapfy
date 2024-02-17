import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface BuyEgldRampEmailProps {
  externnalLinks: {
    twitter: string;
    telegram: string;
    github: string;
    instagram: string;
    facebook: string;
    linkedin: string;
    youtube: string;
    tiktok: string;
  };

  email: string;
}

const baseUrl = "https://dapfy.com";

export const BuyEgldRampEmail = ({
  externnalLinks = {
    facebook: "",
    github: "",
    instagram: "",
    linkedin: "",
    telegram: "",
    twitter: "",
    youtube: "",
    tiktok: "",
  },

  email = "cesrmartn@yahoo.es",
}: BuyEgldRampEmailProps) => (
  <Html>
    <Head />
    <Preview>The platform that helps you simplify DeFi</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`https://www.dapfy.com/images/banner.png`}
          alt="Dapfy"
          style={logo}
        />
        <Text style={paragraph}>Hello {email} 👋,</Text>

        <Text style={paragraph}>
          We&apos;ve teamed up with Tradesilvania to optimize your EGLD
          purchases directly on our dApp, ensuring a faster and cost-effective
          experience.
        </Text>
        <Text style={paragraph}>
          This integration is designed to genuinely enhance your experience by
          offering:
        </Text>

        <Section style={{ marginBottom: "20px" }}>
          <Text style={{ marginBottom: "-10px" }}>
            ➜ Competitive Prices & Minimal Fees: Buy EGLD at the best possible
            rates with the lowest fees.
          </Text>
          <Text style={{ marginBottom: "-10px" }}>
            ➜ Effortless Transactions: A faster process to buy EGLD in seconds.
          </Text>
          <Text style={{ marginBottom: "-10px" }}>
            ➜ Added Value: Everything you need, all in one place, plus rewards
            for engaging with our new feature.
          </Text>
        </Section>

        <Text style={paragraph}>
          Check our latest task to earn rewards and discover the full benefits
          of our partnership.
        </Text>

        <Section style={btnContainer}>
          <Button pX={12} pY={12} style={button} href="https://dapfy.com">
            Earn Rewards
          </Button>
        </Section>
        <Text style={paragraph}>
          We believe this partnership will provide real value to you.{" "}
        </Text>
        <Text style={paragraph}>
          Your feedback is crucial, so please let us know your thoughts as you
          explore the new integration.
        </Text>
        <Text style={paragraph}>Thank you for being with us,</Text>
        <Text style={paragraph}>Team Dapfy </Text>

        <Section
          style={{
            textAlign: "center",
          }}
        >
          <Text>Follow Dapfy:</Text>
          <Section
            style={{
              textAlign: "center" as const,
            }}
          >
            <Row
              style={{
                width: "200px",
                margin: "auto",
              }}
            >
              <Column align="center">
                <Link
                  style={footerLink}
                  href={externnalLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Img
                    src="https://www.dapfy.com/images/telegram.png"
                    style={{
                      height: "27px",
                      width: "27px",
                      marginRight: "10px",
                    }}
                  />
                </Link>
              </Column>
              <Column align="center">
                <Link
                  style={footerLink}
                  href={externnalLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Img
                    src="https://www.dapfy.com/images/x.png"
                    style={{
                      height: "27px",
                      width: "27px",
                      marginLeft: "10px",
                    }}
                  />
                </Link>
              </Column>

              <Column align="center">
                <Link
                  style={footerLink}
                  href={externnalLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Img
                    src="https://www.dapfy.com/images/youtube.png"
                    style={{
                      height: "27px",
                      width: "27px",
                      marginLeft: "10px",
                    }}
                  />
                </Link>
              </Column>

              <Column align="left">
                <Link
                  style={footerLink}
                  href={externnalLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Img
                    src="https://www.dapfy.com/images/tiktok.png"
                    style={{
                      height: "27px",
                      width: "27px",
                      marginLeft: "10px",
                    }}
                  />
                </Link>
              </Column>
            </Row>
          </Section>
          <Text>
            You are receiving this email because you opted in via our website.
          </Text>
          <Text>
            You can{" "}
            <Link href={`https://dapfy.com/unsubscribe?email=${email}`}>
              unsubscribe
            </Link>{" "}
            any moment
          </Text>

          <Text
            style={{
              fontSize: "12px",
              fontStyle: "italic",
            }}
          >
            Copyright (C) 2023{" "}
            <Link
              href="http://dapfy.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dapfy.com
            </Link>
            . All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default BuyEgldRampEmail;

const main = {
  backgroundColor: "black",
  color: "white",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 20px 48px",
};

const logo = {
  margin: "0 auto",
  width: "100%",
  height: "auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
  margin: "20px 0px",
};

const button = {
  backgroundColor: "#fff",
  borderRadius: "4px",
  color: "black",
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
  margin: "0 10px",
};
