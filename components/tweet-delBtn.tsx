"use client";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from "@heroicons/react/24/outline";
import { useOptimistic } from "react";
import { dislikePost, likePost } from "@/app/posts/[id]/actions";
import { deleteTweet } from "@/app/tweets/add/actions";
import { redirect } from "next/navigation";
interface ButtonProps {
  tweetId: number;
}
export default function DelButton({
  tweetId,
}: ButtonProps) {
  const onClick = async () => {
    await deleteTweet(tweetId);
  };
  return (
    <button
      onClick={onClick}
      className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold"
    >
      Delete tweet
    </button>
  );
}