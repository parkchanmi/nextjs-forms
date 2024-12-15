"use server";
import db from "@/lib/db";
export async function getSearchTweets(keyword: string) {
  const tweets = await db.tweet.findMany({
    where:{
      content:{
        startsWith:'%'+keyword+'%'
      }
    },
    include:{
      user: {
      	select: {
      	  username: true,
    	  }
      }
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}