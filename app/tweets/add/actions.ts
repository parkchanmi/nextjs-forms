"use server";

import { z } from "zod";
import fs from "fs/promises";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { tweetSchema } from "./schema";

export async function uploadTweet(formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    content: formData.get("content"),
  };
  
  const result = tweetSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const tweet = await db.tweet.create({
        data: {
          content: result.data.content,
          photo: result.data.photo,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          tweetId: true,
        },
      });
      redirect(`/tweets/${tweet.tweetId}`);
    }
  }
}

export async function getUploadUrl() {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
      },
    }
  );
  const data = await response.json();
  return data;
}


export async function deleteTweet(tweetId: number) {
  const session = await getSession();
  try {
    await db.tweet.delete({
      where: {
        tweetId,
        userId:session.id
      },
    });
    redirect("/tweets");
  } catch (e) {
  }
}