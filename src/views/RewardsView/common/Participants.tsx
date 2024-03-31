import { useXAuthentication } from "@/hooks/useXAuthentication";
import Image from "next/image";
import { useGetUsersAvatars } from "../lib/tasks-hooks";

const Participants = () => {
  const { isAuthenticated } = useXAuthentication();
  const { avatars } = useGetUsersAvatars();
  console.log({});

  if (isAuthenticated) {
    return null;
  }
  return (
    <div className="flex flex-col items-center">
      <p className="mb-2 text-gray-400">
        Join {avatars.length}+ income recipients
      </p>
      <div className="flex -space-x-4 rtl:space-x-reverse">
        {avatars
          // .filter((a, i) => i < 9 && i !== 1)
          .slice(0, 9)
          .map((avatar) => {
            return (
              <Image
                key={avatar.profile_image_url}
                className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                src={avatar.profile_image_url}
                alt="user avatar"
                width={50}
                height={50}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Participants;
