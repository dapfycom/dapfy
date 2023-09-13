import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Input,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import React from "react";
const ScheduleButton = () => {
  const ref = React.useRef();

  const { isOpen, onOpen, onClose } = useDisclosure();
  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  });
  return (
    <Flex w="full" justifyContent={"flex-end"} ref={ref}>
      {isOpen ? (
        <Card maxW={"300px"} bg="primary">
          <CardHeader pb={0} fontWeight="bold">
            Schedule your tweet
          </CardHeader>
          <CardBody pt={2}>
            <Input
              placeholder="Type your timw here (i.e 'in 12 hours' or 'now')"
              mb={2}
              bg="rgb(194, 216, 49)"
              color="gray.600"
            />
            <ActionButton onClick={onClose} size={"sm"} w="full" bg="dark.200">
              Feb 22, 03:12 pm (America/Havana)
            </ActionButton>
          </CardBody>
        </Card>
      ) : (
        <Box>
          <ActionButton onClick={onOpen}>Schedule</ActionButton>
        </Box>
      )}
    </Flex>
  );
};

export default ScheduleButton;
