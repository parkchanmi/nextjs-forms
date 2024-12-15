"use client";
import { InitialTweets } from "@/app/(tabs)/search/page";
import ListBest from "../item/item-best";
import {  useState } from "react";
interface TweetListProps {
  initialTweet: InitialTweets;
}
export default function TweetList({ initialTweet }: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweet);


   return (
    <div>
      <div className="p-5 grid grid-cols-3 gap-5 text-center">
        {tweets.map((tweet,idx) => (
          `${idx+1}위`
        ))}
      </div>
      <div className="p-5 grid grid-cols-3 gap-5">
        {tweets.map((tweet) => (
          <ListBest key={tweet.tweetId} {...tweet} />
        ))}
      </div>
    </div>
  );
}