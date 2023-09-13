import { Box, Text } from "@chakra-ui/react";

const Disclaimer1 = () => {
  return (
    <Box display={"flex"} justifyContent={{ xs: "center", lg: "flex-start" }}>
      <Text
        fontSize={"lsm"}
        fontWeight="500"
        maxW={{ xs: "full", lg: "463.5px" }}
        lineHeight="20px"
        sx={{
          wordSpacing: "3px",
        }}
        textAlign="start"
      >
        Disclaimer: This website is maintained by xBeskar. The contents and
        opinions of the website are those of xBeskar. Please note that legal
        information, including legal templates and legal policies, is not legal
        advice. Please read our legal disclaimer. The reproduction,
        distribution, display, or transmission of the content is strictly
        prohibited, unless authorized by xBeskar. All other company & product
        names may be trademarks of the respective companies with which they are
        associated.
      </Text>
    </Box>
  );
};

export default Disclaimer1;

export const Disclaimer2 = () => {
  return (
    <Box display={"flex"} justifyContent={{ xs: "center", lg: "flex-start" }}>
      <Text
        fontSize={"lsm"}
        fontWeight="500"
        maxW={{ xs: "full", lg: "463.5px" }}
        lineHeight="20px"
        sx={{
          wordSpacing: "3px",
        }}
        textAlign="start"
      >
        xBeskar does not promote or endorse any form of wagering or gambling to
        users under the age of 18. This site encourages responsible gambling and
        provides advice for anyone who believes they, or someone they know, may
        have a gambling addiction. If you believe you have a gambling problem,
        please visit BeGambleAware or GAMCARE for information and help.
        <br />
        <br />
        Learn more about gambling addiction here.
      </Text>
    </Box>
  );
};

export const JoinedDisclaimer = () => {
  return (
    <Box display={"flex"} justifyContent={{ xs: "center", lg: "flex-start" }}>
      <Text
        fontSize={"lsm"}
        fontWeight="500"
        lineHeight="20px"
        sx={{
          wordSpacing: "3px",
        }}
        textAlign="start"
      >
        Disclaimer: This website is maintained by xBeskar. The contents and
        opinions of the website are those of xBeskar. Please note that legal
        information, including legal templates and legal policies, is not legal
        advice. Please read our legal disclaimer. The reproduction,
        distribution, display, or transmission of the content is strictly
        prohibited, unless authorized by xBeskar. All other company & product
        names may be trademarks of the respective companies with which they are
        associated.
        <br />
        <br />
        xBeskar does not promote or endorse any form of wagering or gambling to
        users under the age of 18. This site encourages responsible gambling and
        provides advice for anyone who believes they, or someone they know, may
        have a gambling addiction. If you believe you have a gambling problem,
        please visit BeGambleAware or GAMCARE for information and help.
        <br />
        <br />
        Learn more about gambling addiction here.
      </Text>
    </Box>
  );
};
