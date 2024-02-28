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

interface StreakFeatureEmailProps {
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

export const StreakFeatureEmail = ({
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
}: StreakFeatureEmailProps) => (
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
          We&apos;re thrilled to introduce Strikes, a new feature designed to
          reward your daily engagement.
        </Text>
        <Text style={paragraph}>
          Here&apos;s how you can boost your rewards:
        </Text>

        <Section style={{ marginBottom: "20px" }}>
          <Text style={{ marginBottom: "-10px" }}>
            ➜ No Strikes: Enjoy our standard rewards.
          </Text>
          <Text style={{ marginBottom: "-10px" }}>
            ➜ 7-Day Strike: Earn a 5% bonus on top of standard rewards.
          </Text>
          <Text style={{ marginBottom: "-10px" }}>
            ➜ 14-Day Strike: Get a 10% bonus on standard rewards.
          </Text>
          <Text style={{ marginBottom: "-10px" }}>
            ➜ 30-Day Strike: Secure a 20% bonus and a special one-time reward.
          </Text>
        </Section>

        <Text style={paragraph}>
          Consistency is key. Missing a day resets your strike, but every new
          day is a chance to start again. After a 30-day streak, the challenge
          refreshes, offering more opportunities to maximize your rewards.
        </Text>
        <Text style={paragraph}>
          This feature is built to supercharge engagement and recognize your
          commitment.
        </Text>
        <Text style={paragraph}>
          We&apos;re also rolling out tools and resources for better streak
          management, alongside some exciting events.
        </Text>

        <Section style={btnContainer}>
          <Button
            pX={12}
            pY={12}
            style={button}
            href="https://www.dapfy.com/en/multiversx/rewards"
          >
            Start Your Strike
          </Button>
        </Section>
        <Text style={paragraph}>Happy earning,</Text>
        <Text style={paragraph}>Team Dapfy</Text>
        <Text style={paragraph}>P.S. Every day counts. WAGMI!</Text>

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

export default StreakFeatureEmail;

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

const footerLink = {
  color: "#b7b7b7",
  textDecoration: "underline",
  margin: "0 10px",
};
