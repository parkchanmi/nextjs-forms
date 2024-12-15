"use server";
import db from "@/lib/db";
import { notFound } from "next/navigation";
export async function getUserInfo(username:string) {
    const user = await db.user.findUnique({
        where: {
            username: username,
        },
        include:{
            _count: {
                select: {
                  tweets: true,
                  tweetLike: true,
                },
              },
        }
    });
    if (user) {
    return user;
    }
    notFound();
}