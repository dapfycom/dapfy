import { Input, InputProps } from "@chakra-ui/react";
interface IProps extends InputProps {}
const InputField = ({ ...props }: IProps) => {
  return <Input {...props} />;
};

export default InputField;
