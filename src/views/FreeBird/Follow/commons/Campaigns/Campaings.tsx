import { Box, Flex, Heading } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import SearchTable from "components/Tables/SearchTable";
import { panelColumns } from "./columns";

const Campaings = () => {
  return (
    <Flex
      boxShadow={"0 0 10px rgba(0,0,0,0.4)"}
      px={6}
      py={4}
      rounded="md"
      flexDir="column"
      overflow={"auto"}
    >
      <Flex
        justifyContent={"space-between"}
        w="full"
        mb={4}
        flexDir={{ xs: "column", md: "row" }}
      >
        <Heading fontSize={"lg"}>CAMPAINGS</Heading>
        <ActionButton mt={2}>New Campaign</ActionButton>
      </Flex>

      <Box overflow={"auto"} w="full">
        <SearchTable
          columnsData={panelColumns}
          tableData={[1]}
          notShowEntriesAndSearch
          notShowPagination
          tableWrapperProps={{
            pt: "0 !important",
          }}
        />
      </Box>
    </Flex>
  );
};

export default Campaings;
