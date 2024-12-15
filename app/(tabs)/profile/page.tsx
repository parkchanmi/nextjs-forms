import UserInfo from "@/components/item/item-user";
import db from "@/lib/db";
import getSession from "@/lib/session";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
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
  }
  notFound();
}
async function Username() {
  const user = await getUser();
  return (
    <div>
      <div className="border border-white py-8">
        <UserInfo userId={user.id} username={user.username} email={user?.email} tweetCount={user._count.tweets} likeCount={user._count.tweetLike}/>
        <div className="flex justify-center">
            <Link href={`/users/${user.username}/edit`} className="primary-btn text-lg py-3 w-40">Edit Password</Link>
            </div>
      </div>
    </div>
  );
}
export default async function Profile() {
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };

  return (
    <div>
      <Suspense fallback={"Welcome!"}>
        <Username />
      </Suspense>
      <form action={logOut}>
          <button className="primary-btn text-lg py-2.5">Log out</button>
      </form>
  </div>
  );
}