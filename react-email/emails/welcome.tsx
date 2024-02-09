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

interface KoalaWelcomeEmailProps {
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
  internalLinks: {
    farm: string;
    play: string;
    dust: string;
    aggregator: string;
    defi: string;
    rewards: string;
  };

  email: string;
}

const baseUrl = "https://dapfy.com";

export const KoalaWelcomeEmail = ({
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

  internalLinks = {
    aggregator: "",
    defi: "",
    dust: "",
    farm: "",
    play: "",
    rewards: "",
  },
  email = "cesrmartn@yahoo.es",
}: KoalaWelcomeEmailProps) => (
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
        <Text style={paragraph}>Hi {email},</Text>

        <Text style={paragraph}>
          Welcome to Dapfy - the easy-to-use interface for swapping, farming,
          and earning rewards.
        </Text>
        <Text style={paragraph}>Here’s how it works:</Text>

        <Section style={{ marginBottom: "20px" }}>
          <Text style={{ marginBottom: "-10px" }}>➜ Connect your wallet</Text>
          <Text style={{ marginBottom: "-10px" }}>
            ➜ Connect your 𝕏 account
          </Text>
          <Text style={{ marginBottom: "-10px" }}>
            ➜ Like, comment, retweet our posts
          </Text>
          <Text>➜ Use at least one of our DeFi tools</Text>
        </Section>
        <Section style={btnContainer}>
          <Button pX={12} pY={12} style={button} href="https://dapfy.com">
            Start Earning Now
          </Button>
        </Section>

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

export default KoalaWelcomeEmail;

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
