"use server";

import { z } from "zod";
import fs from "fs/promises";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
const tweetSchema = z.object({
  photo: z.string({
    required_error: "Photo is required",
  }),
  tweet: z.string({
    required_error: "TweetContent is required",
  })
});
export async function uploadTweet(_: any, formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    tweet: formData.get("tweet"),
  };
  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();
    await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
    data.photo = `/${data.photo.name}`;
  }
  const result = tweetSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const tweet = await db.tweet.create({
        data: {
          tweet: result.data.tweet,
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