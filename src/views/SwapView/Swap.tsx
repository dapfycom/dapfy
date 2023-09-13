import { Box, Center, Link, Text, Tooltip } from "@chakra-ui/react";
import MyContainer from "components/Container/Container";
import MyHeading from "components/MyHeading/MyHeading";
import MyTabs from "components/MyTabs/MyTabs";
import { mainSiteRoutes, routeNames } from "config/routes";
import { useRoutes } from "react-router-dom";

const Swap = () => {
  const route = useRoutes(mainSiteRoutes);

  const swaptitle =
    route.props.location.pathname === routeNames.swap
      ? "Swap any tokens on MultiversX"
      : "Buy Liquidity for any token on MultiversX";

  return (
    <MyContainer mb={10}>
      <Center flexDir={"column"}>
        <Tooltip label="Enjoy the smallest fees on MultiversX 🔥">
          <Box mb={10} mt={"-40px"}>
            <MyHeading>{swaptitle}</MyHeading>
          </Box>
        </Tooltip>
        <MyTabs
          isForRouter
          tabsProps={{
            width: "full",
            display: "flex",
            justifyContent: "center",
            flexDir: "column",
            alignItems: "center",
          }}
          tabListWarapperProps={{
            mb: "40px ",
          }}
          tabProps={{
            width: { xs: "150px", tablet: "170px", lg: "246px" },
          }}
          tabData={[
            {
              tabText: "Swap Tokens",
              routerLink: {
                path: routeNames.swap,
              },
            },
            {
              tabText: "Buy Liquidity",
              routerLink: {
                path: routeNames.swapLp,
              },
            },
          ]}
        />
      </Center>
      <Center mt={12} flexDir="column">
        <Link isExternal href="http://xport.al/referral/v3pqh6iqco">
          <Text
            align={"center"}
            fontSize="md"
            color={"primary"}
            mb={4}
            textDecor="underline"
          >
            New to MultiversX? Create your FREE wallet in seconds
          </Text>
        </Link>
        <Link isExternal href="https://buy.multiversx.com/gb">
          <Text
            align={"center"}
            fontWeight={"600"}
            fontSize="2xl"
            color={"secondary"}
          >
            + Buy EGLD
          </Text>
        </Link>
      </Center>
    </MyContainer>
  );
};

export default Swap;
