
import db from "@/lib/db";
import {
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { unstable_cache as nextCache, revalidatePath } from "next/cache";
import BookMarkList from "@/components/list/bookmark-list";
import getSession from "@/lib/session";

const getCachedProducts = nextCache(getInitialProducts, ["bookmark-products"]);

async function getInitialProducts() {
  const session = await getSession();
  const products = await db.bookMark.findMany({
    where:{
      userId:session.id
    },
    select:{
      product:{
        select:{
          title: true,
          price: true,
          created_at: true,
          photo: true,
          id: true,
        },
      }
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

export const metadata = {
  title: "즐겨찾기",
};

//export const revalidate = 60;

export default async function Products() {
  //const initialProducts = await getCachedProducts();
  const initialProducts = await getInitialProducts();
  return (
    <div>
      <h1 className="text-center text-2xl">즐겨찾기 목록</h1>
      <BookMarkList initialProducts={initialProducts} />
    </div>
  );
}