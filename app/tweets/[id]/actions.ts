"use server";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidatePath, revalidateTag } from "next/cache";

export async function likeTweet(tweetId: number) {
  const session = await getSession();
  try {
    await db.tweetLike.create({
      data: {
        tweetId,
        userId: session.id!,
      },
    });
    revalidateTag(`liketweet-status`);
  } catch (e) {}
}
export async function dislikeTweet(tweetId: number) {
  try {
    const session = await getSession();
    await db.tweetLike.delete({
      where: {
        id: {
          tweetId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`liketweet-status`);
  } catch (e) {}
}