import { StarIcon } from "@chakra-ui/icons";
import { Grid, Icon, Text } from "@chakra-ui/react";
import {
  SendMessageIcon,
  SwapIcon,
  TwitterIcon,
} from "components/icons/ui-icons";
import StaticBoxBigIcon from "./StaticBox/StaticBoxBigIcon";
import StaticBoxSmallIcon from "./StaticBox/StaticBoxSmallIcon";

const Statics = () => {
  return (
    <Grid
      w="full"
      templateColumns={{ xs: "1fr", md: "1fr 1fr ", lg: "1fr 1fr 1fr" }}
      rowGap={6}
      columnGap={8}
    >
      <StaticBoxBigIcon
        icon={TwitterIcon}
        iconBgColor="twitter.500"
        text={<Text>Fwolloers</Text>}
        value="4,562"
      />
      <StaticBoxBigIcon
        icon={TwitterIcon}
        iconBgColor="tomato"
        text={<Text>Fwolloers</Text>}
        value="4,562"
      />
      <StaticBoxBigIcon
        icon={TwitterIcon}
        iconBgColor="purple.500"
        text={<Text>Fwolloers</Text>}
        value="4,562"
      />

      <StaticBoxSmallIcon
        text="Likes thanks to Owlead"
        value="24"
        icon={<Icon as={StarIcon} fontSize="2xl" color="red.500" />}
      />
      <StaticBoxSmallIcon
        text="Retweets thanks to Owlead"
        value="3"
        icon={<Icon as={SwapIcon} fontSize="2xl" color="green.500" />}
      />
      <StaticBoxSmallIcon
        text="Replies thanks to Owlead"
        value="1"
        icon={<Icon as={SendMessageIcon} fontSize="2xl" color="blue.500" />}
      />
    </Grid>
  );
};

export default Statics;
