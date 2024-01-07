import { useXAuthentication } from "@/hooks/useXAuthentication";
import Image from "next/image";

const Participants = () => {
  const { isAuthenticated } = useXAuthentication();
  if (isAuthenticated) {
    return null;
  }
  return (
    <div className="flex flex-col items-center">
      <p className="mb-2 text-gray-400">Join 23+ income recipients</p>
      <div className="flex -space-x-4 rtl:space-x-reverse">
        <Image
          className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
          alt=""
          width={50}
          height={50}
        />
        <Image
          className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
          width={50}
          height={50}
        />
        <Image
          className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
          alt=""
          width={50}
          height={50}
        />
        <Image
          className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
          width={50}
          height={50}
        />
        <Image
          className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
          width={50}
          height={50}
        />
        <Image
          className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
          alt=""
          width={50}
          height={50}
        />
        <Image
          className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
          width={50}
          height={50}
        />
      </div>
    </div>
  );
};

export default Participants;
