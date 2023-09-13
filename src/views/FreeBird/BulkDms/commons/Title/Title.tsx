import { FormControl, FormLabel, Input } from "@chakra-ui/react";

const Title = () => {
  return (
    <FormControl maxW={"300px"}>
      <FormLabel color="gray.600">Title</FormLabel>
      <Input type="text" placeholder="My leads..." />
    </FormControl>
  );
};

export default Title;
