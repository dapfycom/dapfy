import { Flex, FormControl, FormLabel } from "@chakra-ui/react";
import InputField from "views/FreeBird/commons/InputField";

const ManuallySelect = () => {
  return (
    <Flex flexDir={"column"} gap={4}>
      <FormControl>
        <FormLabel htmlFor="user" color="gray.600">
          Twitter users
        </FormLabel>
        <InputField id="user" placeholder="Name or @handle1 @handle2..." />
      </FormControl>
    </Flex>
  );
};

export default ManuallySelect;
