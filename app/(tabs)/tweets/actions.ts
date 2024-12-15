"use server";
import db from "@/lib/db";
export async function getMoreTweets(page: number) {
  const tweets = await db.tweet.findMany({
    include: {
      user: {
      	select: {
      	  username: true,
    	  }
      }
    },
    skip: page * 3,
    take: 3,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}