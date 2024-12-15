"use client";
import { InitialTweets } from "@/app/(tabs)/search/page";
import ListTweet from "../item/item-tweet";
import {  useState } from "react";
import { getSearchTweets } from "@/app/(tabs)/search/actions";
import Input from "../input";
interface TweetListProps {
  initialTweet: InitialTweets;
}
export default function TweetList({ initialTweet }: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweet);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);

  function onChange(event : React.ChangeEvent<HTMLInputElement>){
    setKeyword(event.target.value);
  }
  async function searchTweet(){
    setIsLoading(true);
    const newTweets = await getSearchTweets(keyword);
    if (newTweets!=null && newTweets.length !== 0) {
      setIsEmpty(false);
      setTweets((prev) => [...newTweets]);
    } else {
      setIsEmpty(true);
    }
    setIsLoading(false);
  }

   return (
    <div>
      <div className="w-full">
        <input className="bg-transparent rounded-md w-[calc(100%-100px)] h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
         name="keyword" type="text" placeholder="검색어를 입력하세요" value={keyword} onChange={onChange}/>
        <button
          onClick={searchTweet}
          className="text-sm font-semibold bg-orange-500 w-fit h-10 mx-auto ml-3 px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >Search
        </button>
      </div>
      <div className="p-5 flex flex-col gap-5">
        {isEmpty ? <div>검색 결과가 없습니다.</div>: 
          tweets.map((tweet) => (
            <ListTweet key={tweet.tweetId} {...tweet} />
          ))
        }
        
      
      </div>
    </div>
  );
}