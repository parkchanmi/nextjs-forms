import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToWon } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}
async function getTweet(tweetId: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      tweetId,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      }
    }
  });
  return tweet;
}

  export default async function TweetDetail({
    params,
}: {
  params: { id: string };
}) {
    const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await getTweet(id);
  if (!tweet) {
    return notFound();
  }
  const isOwner = await getIsOwner(tweet.userId);
  return (
    <div>
      <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
        
        <div>
          <h3>Detail Tweet</h3>
        </div>
      </div>
      <div className="relative aspect-square">
        <Image
            className="object-cover"
            fill
            src={tweet.photo}
            alt={tweet.tweet}
            />
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-semibold">{tweet.tweet}</h1>
      </div>
      <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-neutral-800 flex justify-between items-center">
        {isOwner ? (
          <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
            Delete tweet
          </button>
        ) : null}
      </div>
    </div>
  );
}