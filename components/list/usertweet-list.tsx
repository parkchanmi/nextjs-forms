"use client";
import { InitialTweets } from "@/app/(tabs)/users/[username]/page";
import UserListTweet from "../item/item-usertweet";
import {  useState } from "react";
import { getSearchTweets } from "@/app/(tabs)/search/actions";
import Input from "../input";
interface TweetListProps {
  initialTweet: InitialTweets;
}
export default function UserTweetList({ initialTweet }: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweet);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);


   return (
    <div>
      <div className="p-5 flex flex-col gap-5">
        {isEmpty ? <div>게시한 트윗이 없습니다.</div>: 
          tweets.map((tweet) => (
            <UserListTweet key={tweet.tweetId} {...tweet} />
          ))
        }
        
      
      </div>
    </div>
  );
}