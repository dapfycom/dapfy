import { WriteTwit } from "./WriteTwitt/WriteTwit";

const TwitterAdminView = () => {
  return (
    <div className="h-full px-4 py-6 lg:px-8 ">
      <div className="border-none p-0 outline-none  h-full flex  flex-col  w-full">
        <WriteTwit />
      </div>
    </div>
  );
};

export default TwitterAdminView;
