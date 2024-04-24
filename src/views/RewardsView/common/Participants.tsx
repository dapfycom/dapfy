import { useXAuthentication } from "@/hooks/useXAuthentication";
import Image from "next/image";

const Participants = () => {
  const { isAuthenticated } = useXAuthentication();
  const avatars = [
    {
      profile_image_url:
        "https://pbs.twimg.com/profile_images/1699670393731063808/VWgs-OiN_normal.jpg",
    },
    {
      profile_image_url:
        "https://pbs.twimg.com/profile_images/1672239677468733446/ZHr2boeS_normal.jpg",
    },

    {
      profile_image_url:
        "https://pbs.twimg.com/profile_images/1696953994747260929/4tqqEcff_normal.jpg",
    },

    {
      profile_image_url:
        "https://pbs.twimg.com/profile_images/1450003399706095622/hDAzjsDt_normal.jpg",
    },
    {
      profile_image_url:
        "https://pbs.twimg.com/profile_images/1507743863628259330/GkyeJPXJ_normal.jpg",
    },
    {
      profile_image_url:
        "https://pbs.twimg.com/profile_images/1636029481910689792/_GwsVMdT_normal.jpg",
    },

    {
      profile_image_url:
        "https://pbs.twimg.com/profile_images/1503478892157444096/Sp4UsZiC_normal.jpg",
    },

    {
      profile_image_url:
        "https://pbs.twimg.com/profile_images/1777668805327486976/jP-zkSo5_normal.jpg",
    },
  ];

  if (isAuthenticated) {
    return null;
  }
  return (
    <div className="flex flex-col items-center">
      <p className="mb-2 text-gray-400">Join 746+ income recipients</p>
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
