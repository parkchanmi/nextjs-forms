"use client";

import { UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
interface UserInfoProps {
  userId: number,
  username: string;
  email: string|null;
  tweetCount: number;
  likeCount: number;
}
export default function UserInfo({
  userId,
  username,
  email,
  tweetCount,
  likeCount
}: UserInfoProps) {
  return (
    <div>
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <div className="flex">
        <div className="size-10 f-left"><UserIcon/></div>
        <h1 className="text-2xl m-1">Profile</h1>
        </div>
        
        <div className="*:mt-5 *:text-sm">
          <h3>Name : {username}</h3>
          <h3>Email : {email}</h3>
          <h3>TweetCount : {tweetCount}</h3>
          <h3>LikeCount : {likeCount}</h3>
        </div>
      </div>
    </div>
    </div>
  );
}