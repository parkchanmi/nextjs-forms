import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { getUserInfo } from "./actions";
import UserInfo from "@/components/item/item-user";
import { Prisma } from "@prisma/client";
import db from "@/lib/db";
import UserListTweet from "@/components/item/item-usertweet";
import UserTweetList from "@/components/list/usertweet-list";
import Link from "next/link";
import getSession from "@/lib/session";


export type InitialUser = Prisma.PromiseReturnType<
  typeof getUserInfo
>;

async function getInitialTweets(userId:number) {
  const session = await getSession();
  const tweets = await db.tweet.findMany({
      where :{
        userId
      },
      include:{
        user: {
          select: {
            username: true,
          }
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return tweets;
}

export type InitialTweets = Prisma.PromiseReturnType<
typeof getInitialTweets
>;

async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

export default async function Users({
    params,
}: {
  params: { username: string };
}) {
    const userInfo = await getUserInfo(params.username);
    if (!userInfo) {
    return notFound();
    }
    const isOwner = await getIsOwner(userInfo.id);
    const initialTweets = await getInitialTweets(userInfo.id);
    return (
        <div>
          <div className="border border-white py-8">
            <UserInfo userId={userInfo.id} username={userInfo.username} email={userInfo?.email}
             tweetCount={userInfo._count.tweets} likeCount={userInfo._count.tweetLike}/>
            {isOwner?<div className="flex justify-center">
            <Link href={`/users/${params.username}/edit`} className="primary-btn text-lg py-3 w-40">Edit Info</Link>
            </div>:null}
          </div>
          <div className="mt-10">
            <div>Tweet List</div>
            <UserTweetList initialTweet={initialTweets}/>
            
          </div>
        </div>
    );
}