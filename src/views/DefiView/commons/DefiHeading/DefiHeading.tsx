import {
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/PageHeader/PageHeader";

const FarmHeading = () => {
  return (
    <div>
      <PageHeaderHeading className="mb-6">
        <span className={"gradienteTitle"}>Defi</span>
      </PageHeaderHeading>
      <PageHeaderDescription>Earn by lending your assets</PageHeaderDescription>
    </div>
    // <Center textAlign={"center"} flexDir="column">
    //   <MyHeading mb={6}>Farm</MyHeading>
    //   <Text fontSize={"lg"}>Stake tokens to earn more rewards</Text>
    // </Center>
  );
};

export default FarmHeading;
