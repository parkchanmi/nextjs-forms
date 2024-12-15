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
  views:number;
  user:{
    username: string;
  },
  _count:{
    likes:number;
  }
}
export default function UserListTweet({
  userId,
  photo,
  content,
  created_at,
  tweetId,
  user,
  views,
  _count
}: ListTweetProps) {
  return (
    <Link
          href={`/tweets/${tweetId}`}
          className="pb-5 mb-5 border-b border-neutral-500 text-neutral-400 flex  flex-col gap-2 last:pb-0 last:border-b-0"
        >
          <p>{content.length>100?content.slice(0,100)+"...":content}</p>
          <div className="flex items-center justify-between text-sm">
            <div className="flex gap-4 items-center">
              <span>{formatToTimeAgo(created_at.toString())}</span>
              <span>·</span>
              <span>조회 {views}</span>
            </div>
            <div className="flex gap-4 items-center *:flex *:gap-1 *:items-center">
              <span>
                <HandThumbUpIcon className="size-4" />
                {_count?.likes}
              </span>
            </div>
          </div>
    </Link>
  );
}