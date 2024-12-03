import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";
interface ListTweetProps {
  tweet: string;
  created_at: Date;
  tweetId: number;
}
export default function ListTweet({
    tweet,
    created_at,
    tweetId,
}: ListTweetProps) {
  return (
    <Link href={`/tweets/${tweetId}`} className="flex gap-5">
      <div className="flex flex-col gap-1 *:text-white">
        <span className="text-lg">{tweet}</span>
        <span className="text-sm text-neutral-500">
        {formatToTimeAgo(created_at.toString())}
        </span>
      </div>
    </Link>
  );
}