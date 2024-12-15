import SearchList from "@/components/list/search-list";
import BestList from "@/components/list/best-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";
import Input from "@/components/input";
import { useState } from "react";

async function getInitialTweets() {
    const tweets = await db.tweet.findMany({
        include:{
          user: {
            select: {
              username: true,
            }
          }
        },
        take: 3,
        orderBy: {
          created_at: "desc",
        },
      });
      return tweets;
}

export type InitialTweets = Prisma.PromiseReturnType<
  typeof getInitialTweets
>;

  export default async function Tweets() {
    const initialTweets = await getInitialTweets();
    return (
        <div className="mt-10">
          <SearchList initialTweet={initialTweets} />
        </div>
    );
  }