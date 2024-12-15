import PostList from "@/components/list/post-list";
import db from "@/lib/db";
import {
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { unstable_cache as nextCache, revalidatePath } from "next/cache";

async function getPosts() {
  const posts = await db.post.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      views: true,
      created_at: true,
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return posts;
}

export type InitialPosts= Prisma.PromiseReturnType<
  typeof getPosts
>;

export const metadata = {
  title: "동네생활",
};
export default async function Life() {
  const initialPosts = await getPosts();
    const revalidate = async () => {
      "use server";
      revalidatePath("/life");
    };
  return (
    <div>
      <PostList initialPosts={initialPosts} />
      <form action={revalidate}>
        <button>Revalidate</button>
      </form>
      <Link
        href="/posts/add"
        className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}