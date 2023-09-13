import {
  Box,
  Center,
  Grid,
  GridItem,
  SimpleGrid,
  Stack,
  Tooltip,
} from "@chakra-ui/react";
import MyContainer from "components/Container/Container";
import { MetaHead } from "components/MetaHead/MetaHead";
import MyHeading from "components/MyHeading/MyHeading";
import ChooseBetSection from "./common/ChooseBetSection/ChooseBetSection";
import Coin from "./common/GameSection/common/Coin";
import GameActions from "./common/GameSection/common/GameActions";
import StatsSection from "./common/StatsSection/StatsSection";
import TableSection from "./common/TableSection/TableSection";

const CoinFlipView = () => {
  return (
    <>
      <MetaHead metaTitle="Coin Flip" />

      <MyContainer mb={"80px"}>
        <Center mt={"-40px"}>
          <Tooltip label="50-50 odds, 100% on chain transparency 🍀">
            <Box mb={10}>
              <MyHeading>The Coin Flip Game</MyHeading>
            </Box>
          </Tooltip>
        </Center>
        <SimpleGrid
          columns={{ xs: 1, "3xl": 2 }}
          columnGap="20px"
          rowGap={"40px"}
        >
          <SimpleGrid columns={{ xs: 1, md: 2 }} gap="20px">
            <Stack gap={"20px"}>
              <Coin />
              <Box display={{ xs: "none", md: "block" }} h="full">
                <GameActions />
              </Box>

              <Box display={{ xs: "block", md: "none" }}>
                <ChooseBetSection />
              </Box>
            </Stack>
            <Box>
              <Box display={{ xs: "block", md: "none" }}>
                <GameActions />
              </Box>
              <Box display={{ xs: "none", md: "block" }}>
                <ChooseBetSection />
              </Box>
            </Box>
          </SimpleGrid>
          <Grid templateColumns={{ xs: "1fr", lg: "1fr 2fr" }} gap="20px">
            <GridItem>
              <StatsSection />
            </GridItem>
            <GridItem
              overflow={"auto"}
              sx={
                {
                  //   scrollbarWidth: "none",
                  //   "& ::-webkit-scrollbar": {
                  //     display: "none",
                  //   },
                  //   msOverflowStyle: "none",
                }
              }
            >
              <TableSection />
            </GridItem>
          </Grid>
        </SimpleGrid>
      </MyContainer>
    </>
  );
};

export default CoinFlipView;
