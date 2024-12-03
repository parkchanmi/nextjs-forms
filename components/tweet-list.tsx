"use client";
import { InitialTweets } from "@/app/(auth)/tweets/page";
import ListTweet from "./list-tweet";
import {  useState } from "react";
import { getMoreTweets } from "@/app/(auth)/tweets/actions";
interface TweetListProps {
  initialTweet: InitialTweets;
}
export default function TweetList({ initialTweet }: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweet);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const onLoadAfter = async () => {
    setIsLoading(true);
    const newTweets = await getMoreTweets(page + 1);
    const checkNextTweet = await getMoreTweets(page + 2);
    if (newTweets.length !== 0) {
      setPage((prev) => prev + 1);
      setTweets((prev) => [...newTweets]);

      if(checkNextTweet.length === 0){
        setIsLastPage(true);
      }
    }else{
      setIsLastPage(true);
    }
    setIsLoading(false);
  };

  const onLoadBefore = async () => {
    setIsLoading(true);
    const newTweets = await getMoreTweets(page - 1);
    if (newTweets.length !== 0) {
      setPage((prev) => prev - 1);
      setTweets((prev) => [...newTweets]);
      setIsLastPage(false);
    }
    setIsLoading(false);
  };


   return (
    <div className="p-5 flex flex-col gap-5">
      {tweets.map((tweet) => (
        <ListTweet key={tweet.tweetId} {...tweet} />
      ))}
      <div className="justify-center items-center flex">
      {page!=0 ? 
      <button 
      onClick={onLoadBefore}
      disabled={isLoading}
        className=" text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
      >
        {isLoading ? "로딩 중" : "Prev"}
        </button> : null }
       {!isLastPage ? (
        <button 
        onClick={onLoadAfter}
        disabled={isLoading}
          className=" text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? "로딩 중" : "Next"}
          </button>
      ) : null}
        </div>
    </div>
  );
}