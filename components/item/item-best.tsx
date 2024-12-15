import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
interface ListTweetProps {
  photo: string;
  content: string;
  created_at: Date;
  tweetId: number;
}
export default function ListTweet({
  photo,
  content,
  created_at,
  tweetId,
}: ListTweetProps) {
  return (
    <Link href={`/tweets/${tweetId}`} className="">
      <div className="relative size-28 rounded-md overflow-hidden m-auto">
      <Image
          fill
          src={`${photo}/width=500,height=500`}
          alt="none"
          className="object-cover"
        />
      </div>
    </Link>
  );
}