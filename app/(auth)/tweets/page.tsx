import TweetList from "@/components/tweet-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

async function getInitialTweets() {
    const tweets = await db.tweet.findMany({
        select: {
          tweet: true,
          created_at: true,
          tweetId: true,
        },
        take: 1,
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
            <TweetList initialTweet={initialTweets} />
        </div>
    );
  }