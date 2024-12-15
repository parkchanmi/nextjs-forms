import { formatToTimeAgo } from "@/lib/utils";
import { ChatBubbleBottomCenterIcon, HandThumbUpIcon, UserCircleIcon as UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
interface ListTweetProps {
  userId: number,
  photo: string;
  content: string;
  created_at: Date;
  tweetId: number;
  user:{
    username: string;
  }
}
export default function ListTweet({
  userId,
  photo,
  content,
  created_at,
  tweetId,
  user
}: ListTweetProps) {
  return (
    <Link href={`/tweets/${tweetId}`} className="flex gap-5">
      <div className="relative w-[300px] h-[300px] rounded-md overflow-hidden">
      <Image
          fill
          src={`${photo}/width=300,height=300`}
          alt="none"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-1 *:text-white w-[calc(100%-300px)]">
        <Link href={`/users/${user.username}`} className="*:text-white">
          <div className="flex">
            <div className="size-10 overflow-hidden rounded-full"><UserIcon/></div>
            <div className="flex flex-col">
              <span className="text-sm w-fit">{user.username}</span>
              <span className="text-sm text-neutral-500">
                {formatToTimeAgo(created_at.toString())}
              </span>
            </div>
        </div>
        </Link>
        <span className="text-lg">{content}</span>
      </div>
    </Link>
  );
}