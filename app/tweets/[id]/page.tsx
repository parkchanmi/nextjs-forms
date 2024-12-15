import LikeButton from "@/components/tweet-likeBtn";
import DelButton from "@/components/tweet-delBtn";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo, formatToWon } from "@/lib/utils";
import { EyeIcon, UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";
import { notFound } from "next/navigation";
async function getIsOwner(userId: number) {
  revalidateTag(`liketweet-status`);
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

async function getTweet(tweetId: number) {
  try {
    const tweet = await db.tweet.update({
      where: {
        tweetId,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
    return tweet;
  } catch (e) {
    return null;
  }
}
const getCachedTweet = nextCache(getTweet, ["tweet-detail"], {
  tags: ["tweet-detail"],
  revalidate: 60,
});
async function getLikeStatus(tweetId: number) {
const session = await getSession();
const isLiked = await db.tweetLike.findUnique({
  where: {
    id: {
      tweetId,
      userId: session.id!,
    },
  },
});
const likeCount = await db.tweetLike.count({
  where: {
    tweetId,
  },
});
return {
  likeCount,
  isLiked: Boolean(isLiked),
};
}
function getCachedLikeStatus(tweetId: number) {
  const cachedOperation = nextCache(getLikeStatus, ["liketweet-status"], {
    tags: [`liketweet-status`],
  });
  return cachedOperation(tweetId);
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
  const { likeCount, isLiked } = await getCachedLikeStatus(id);

  return (
    <div>
    <div className="p-5 text-white pb-[120px]">
      <Link href={`/users/${tweet.user.username}`} className="*:text-white">
      <div className="flex items-center gap-2 mb-2">
        <div className="size-7 rounded-full"><UserIcon/></div>
        <div>
          <span className="text-sm font-semibold">{tweet.user.username}</span>
          <div className="text-xs">
            <span>{formatToTimeAgo(tweet.created_at.toString())}</span>
          </div>
        </div>
      </div>
      </Link>
      <div className="relative w-[500px] h-[500px] rounded-md overflow-hidden">
      <Image
          fill
          src={`${tweet.photo}/width=500,height=500`}
          alt="none"
          className="object-cover"
        />
      </div>
      <pre className="mb-5">{tweet.content}</pre>
      <div className="flex flex-col gap-5 items-start">
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <EyeIcon className="size-5" />
          <span>조회 {tweet.views}</span>
        </div>
        <LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={id} />
      </div>
    </div>
    <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-neutral-800 flex justify-between items-center">
        {isOwner ? (
          <DelButton tweetId={id}/>
        ) : null}
      </div>  
    </div>
  );
}