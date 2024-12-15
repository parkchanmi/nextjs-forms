import TweetList from "@/components/list/tweet-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";

async function getInitialTweets() {
    const tweets = await db.tweet.findMany({
        include:{
          user: {
            select: {
              username: true,
            }
          }
        },
        take: 3,
        orderBy: {
          created_at: "desc",
        },
      });
      return tweets;
}

export type InitialTweets = Prisma.PromiseReturnType<
  typeof getInitialTweets
>;

  export default async function Tweets() {
    const initialTweets = await getInitialTweets();
    return (
        <div>
            <Link
              href="/tweets/add"
              className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
            >
              <PlusIcon className="size-10" />
            </Link>
            <TweetList initialTweet={initialTweets} />

        </div>
    );
  }