import {
  Box,
  Center,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import MyContainer from "components/Container/Container";
import { RingIcon } from "components/icons/ui-icons";
import FireLeft from "./commons/FireLeft";
import FireRight from "./commons/FireRight";
import ForgeCard from "./commons/ForgeCard";

const TheForgeView = () => {
  return (
    <Box position={"relative"}>
      <Box display={{ xs: "none", "2xl": "block" }}>
        <FireLeft />
        <FireRight />
      </Box>
      <MyContainer mb="150px">
        <Center flexDir={"column"} w="full" gap="30px">
          <ForgeCard>
            <Heading
              as="h2"
              color="white"
              mb="20px"
              fontSize={{ xs: "lg", lg: "28px" }}
            >
              Beskar Forge
            </Heading>
            <Stack
              spacing={"30px"}
              mb="50px"
              fontSize={{ xs: "lsm", lg: "lg" }}
            >
              <Text fontSize={{ xs: "lg", lg: "28px" }}>
                Sell your $BSK with NO PRICE IMPACT and make the DAO stronger
                while doing so!
              </Text>
              <Text>
                Welcome to the{" "}
                <Box as="span" color="white">
                  $BSK
                </Box>{" "}
                forge Portal! We’re excited to see you here. This burn portal is
                set to make it rewarding for users to regularly burn{" "}
                <Box as="span" color="white">
                  $BSK
                </Box>{" "}
                while effectively reducing its circulating supply.
              </Text>
              <Text>
                Burn{" "}
                <Box as="span" color="white">
                  $BSK
                </Box>
                , reduce its circulating supply, and generate passive income
                while doing so!
              </Text>
              <Text>
                No fees - The Forge will charge 0 fees + pay the transaction
                fees
              </Text>

              <Text>
                Burn $BSK, Reduce its circulating supply and Get rewarded
              </Text>
            </Stack>

            <Text color="primary" textDecor={"underline"} fontSize="lg">
              learn More
            </Text>
          </ForgeCard>
          <ForgeCard gap={{ xs: "20px", lg: "30px" }}>
            <Center
              bg="#292C2F"
              borderRadius={"lg"}
              border={"1px"}
              borderColor="dark.300"
              px={{ xs: "20px", lg: "50px" }}
              w="full"
            >
              <Stack
                divider={<StackDivider borderColor="dark.300" />}
                width="full"
              >
                <Center py={{ xs: "14px", lg: "25px" }}>
                  <Text fontSize={{ xs: "lsm", lg: "lg" }}>
                    Total burnt:{" "}
                    <Box as="span" color="white">
                      {" "}
                      2,442,597,894.2 bsk
                    </Box>
                  </Text>
                </Center>
                <Center py={{ xs: "14px", lg: "25px" }}>
                  <Text fontSize={{ xs: "lsm", lg: "lg" }}>
                    you burnt:
                    <Box as="span" color="white">
                      {" "}
                      0 bsk
                    </Box>
                  </Text>
                </Center>
                <Center pb="25px" pt="20px">
                  <Text fontSize={{ xs: "lsm", lg: "lg" }}>
                    you own:
                    <Box
                      as="span"
                      color="white"
                      fontSize={{ xs: "2xl", lg: "3xl" }}
                      display={{ xs: "block", lg: "inline" }}
                    >
                      {" "}
                      0.00%
                    </Box>{" "}
                    of the pool
                  </Text>
                </Center>
              </Stack>
            </Center>
            <Center
              bg="#292C2F"
              borderRadius={"lg"}
              border={"1px"}
              borderColor="dark.300"
              w="full"
              flexDir={"column"}
              gap={{ xs: "20px", lg: "30px" }}
              px={{ xs: "20px", lg: "50px" }}
              py="30px"
            >
              <Text fontSize={{ xs: "lsm", lg: "lg" }}>Collectable Egld</Text>
              <RingIcon fontSize={{ xs: "28px", lg: "36px" }} />
              <Text fontSize={{ xs: "xs", lg: "13px" }} color="#2F5019">
                collected till now: 0 egld
              </Text>
              <ActionButton
                fontSize={{ xs: "lg", lg: "24px" }}
                h="auto"
                py="15px"
                px="42px"
              >
                Claim
              </ActionButton>
            </Center>

            <Center
              bg="#292C2F"
              borderRadius={"lg"}
              border={"1px"}
              borderColor="dark.300"
              px="50px"
              w="full"
              flexDir={"column"}
              gap="30px"
              p="30px"
            >
              <Center
                flexDir={"column"}
                px="25px"
                py="30px"
                bg="dark.800"
                borderRadius={"lg"}
                boxShadow="0px 4px 14px 10px rgba(0, 0, 0, 0.25)"
              >
                <Text
                  fontSize={{ xs: "15px", lg: "lg" }}
                  mb={{ xs: "20px", lg: "30px" }}
                  color="white"
                >
                  it looks like your $bsk balance is zero!
                </Text>
                <Text
                  color="primary"
                  fontSize={{ xs: "xs", lg: "lsm" }}
                  textDecoration="underline"
                >
                  Click here to buy and burn $bsk
                </Text>
              </Center>
            </Center>
          </ForgeCard>
        </Center>
      </MyContainer>
    </Box>
  );
};

export default TheForgeView;
