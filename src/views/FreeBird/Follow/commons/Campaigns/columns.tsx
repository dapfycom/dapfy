import { EditIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon, Switch } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
export const panelColumns = [
  {
    Header: "",
    accessor: "active",
    Cell: ({ row }) => {
      return (
        <Flex>
          <Switch />
        </Flex>
      );
    },
  },
  {
    Header: "Account",
    accessor: "",
    Cell: ({ row }) => {
      return (
        <Flex display={"flex"} alignItems={"center"}>
          @SmokeAwayyyy
        </Flex>
      );
    },
  },
  {
    Header: "Status",
    accessor: "",
    Cell: ({ row }) => {
      return (
        <Flex alignItems="center" gap={1}>
          <Box as="span" boxSize="10px" rounded="full" bg="green.500"></Box>
          Running
        </Flex>
      );
    },
  },
  {
    Header: "Followed",
    accessor: "",
    Cell: ({ row }) => {
      return <Flex> 1,054</Flex>;
    },
  },
  {
    Header: "Unfollowed",
    accessor: "",
    Cell: ({ row }) => {
      return <Flex> 858</Flex>;
    },
  },
  {
    Header: "Cleanup",
    accessor: "",
    Cell: ({ row }) => {
      return <Flex> Active</Flex>;
    },
  },
  {
    Header: "Gained",
    accessor: "",
    Cell: ({ row }) => {
      return <Flex> 105</Flex>;
    },
  },
  {
    Header: "Follow Back Ratio",
    accessor: "",
    Cell: ({ row }) => {
      return <Flex> 9.96% </Flex>;
    },
  },
  {
    Header: "Actions",
    accessor: "",
    Cell: ({ row }) => {
      return (
        <Flex flexDir={"column"} gap={4}>
          <ActionButton>
            <Icon as={EditIcon} />
          </ActionButton>
        </Flex>
      );
    },
  },
];
