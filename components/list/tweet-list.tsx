"use client";
import { InitialTweets } from "@/app/(tabs)/tweets/page";
import ListTweet from "../item/item-tweet";
import {  useEffect, useRef, useState } from "react";
import { getMoreTweets } from "@/app/(tabs)/tweets/actions";
interface TweetListProps {
  initialTweet: InitialTweets;
}
export default function TweetList({ initialTweet }: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweet);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

const trigger = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newTweets = await getMoreTweets(page + 1);
          if (newTweets.length !== 0) {
            setTweets((prev) => [...prev, ...newTweets]);
            setPage((prev) => prev + 1);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      },
      {
        threshold: 1.0,
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => {
        observer.disconnect();
      };
    }, [page]);

   return (
    <div className="p-5 flex flex-col gap-5">
      {tweets.map((tweet) => (
        <ListTweet key={tweet.tweetId} {...tweet} />
      ))}
    </div>
  );
}