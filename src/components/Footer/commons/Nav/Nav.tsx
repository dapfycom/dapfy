import { Flex, Heading, Text } from "@chakra-ui/react";
import { mainSiteRoutes } from "config/routes";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <Flex flexDir={"column"}>
      <Heading as="h6" color="white" fontSize={"2xl"} mb="34px">
        Explore
      </Heading>

      <Flex flexDir={"column"} gap="20px">
        {mainSiteRoutes.map((route) => {
          if (route.soon) {
            return null;
          }
          return (
            <Link to={route.path} key={route.path}>
              <Text
                _hover={{
                  color: "white",
                }}
                fontSize={"lg"}
              >
                {route.title}
              </Text>
            </Link>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default Nav;
