import { StarIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Box,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  List,
  ListIcon,
  ListItem,
  Select,
  Switch,
  Text,
  Textarea,
} from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import { TipsIcon } from "components/icons/ui-icons";
import { useState } from "react";

interface ITemplateMessage {
  id: number;
  message: string;
}

const templateMessages: ITemplateMessage[] = [
  {
    id: 1,
    message: "Hey, thanks for the follow! What's on your mind these days?",
  },
  {
    id: 2,
    message:
      "Nice to meet you! Would you mind telling me what part of my content resonates with you?",
  },
  {
    id: 3,
    message: `Hi 👋  My name is ___!

        I am a ___ from ___.
        
        How can I help you?`,
  },
  {
    id: 4,
    message: `I really appreciate the follow!

        I like to meet new people, what do we have in common?`,
  },
  {
    id: 5,
    message: `Hey, thanks for the follow!

        I thought that this auto-DM would help us break the ice. Don't worry if you do not wish to chat!
        
        What are you working on?`,
  },
];

const OutBoundView = () => {
  const [selectedTempalte, setSelectedTempalte] = useState<ITemplateMessage>({
    id: 0,
    message: "",
  });
  const handleOnchageTemplate = (e) => {
    const template = templateMessages.find(
      (t) => t.id === Number(e.target.value)
    );
    if (template) {
      setSelectedTempalte(template);
    }
  };
  return (
    <Box w="full">
      <Text mb={3} color="gray.500">
        Send an automatic Direct Message to your new followers
      </Text>
      <FormControl display="flex" alignItems="center" mb={3}>
        <FormLabel
          htmlFor="disabled"
          mb="0"
          flex={1}
          cursor={"pointer"}
          color="gray.800"
          fontWeight={"500"}
        >
          Disabled
        </FormLabel>
        <Switch id="disabled" />
      </FormControl>
      <Alert status="error" borderRadius={"md"} mb={5}>
        <AlertIcon />
        Your auto-DM is not enabled yet
      </Alert>
      <Select
        placeholder="Choose message from a template"
        mb={3}
        value={0}
        onChange={handleOnchageTemplate}
      >
        {templateMessages.map((t) => {
          return (
            <option key={t.id} value={t.id}>
              {t.message}
            </option>
          );
        })}
      </Select>
      <Textarea
        placeholder="Hey, thanks for following me! How can I help you?"
        value={selectedTempalte.message}
        rows={8}
      />
      <Flex justify="flex-end" mt={5} mb={8}>
        <ActionButton bg="dark.500" fontSize="14px">
          Update message
        </ActionButton>
      </Flex>

      <Alert status="warning" borderRadius={"md"} mb={12} fontSize="14px">
        <AlertIcon />
        By sending a welcome message, you'll start new engaging conversations
        with your followers 🤝
      </Alert>
      <Card variant="elevated">
        <CardBody>
          <Flex gap={2} alignItems="center" mb={2}>
            <TipsIcon fontSize={"2xl"} color="blue.200" />
            <Heading size="md">Tips</Heading>
          </Flex>
          <Flex gap={8}>
            <Box></Box>
            <List spacing={3} fontSize="14px">
              <ListItem display={"flex"} alignItems={"center"}>
                <ListIcon as={StarIcon} color="blue.200" fontSize={"sm"} />
                Don't be spammy — avoid sending links or promoting your website
              </ListItem>
              <ListItem display={"flex"} alignItems={"center"}>
                <ListIcon as={StarIcon} color="blue.200" fontSize={"sm"} />
                Be kind and helpful
              </ListItem>
              <ListItem display={"flex"} alignItems={"center"}>
                <ListIcon as={StarIcon} color="blue.200" fontSize={"sm"} />
                Close the message with a question
              </ListItem>
            </List>
          </Flex>
        </CardBody>
      </Card>
    </Box>
  );
};

export default OutBoundView;
