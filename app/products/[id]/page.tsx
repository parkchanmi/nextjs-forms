import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToWon } from "@/lib/utils";
import { UserIcon ,StarIcon as SolidStarIcon} from "@heroicons/react/24/solid";
import { StarIcon as OutlineStarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  unstable_cache as nextCache,
  revalidatePath,
  revalidateTag,
} from "next/cache";
import BookMarkButton from "@/components/bookmark-Btn";

async function getIsOwner(userId: number) {
  revalidateTag(`bookmark-status`);
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}
async function getProduct(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return product;
}

const getCachedProduct = nextCache(getProduct, ["product-detail"], {
  tags: ["product-detail"],
});
async function getProductTitle(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    select: {
      title: true,
    },
  });
  return product;
}

  export default async function ProductDetail({
    params,
}: {
  params: { id: string };
}) {
    const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const product = await getCachedProduct(id);
  if (!product) {
    return notFound();
  }
  async function getBookMarkStatus(id: number) {
  const session = await getSession();
  const isBookMark = await db.bookMark.findUnique({
    where: {
      id: {
        productId:id,
        userId: session.id!,
      },
    },
  });
  return {
    isBookMark: Boolean(isBookMark),
  };
}
  function getCachedBookMarkStatus(id: number) {
    const cachedOperation = nextCache(getBookMarkStatus, ["bookmark-status"], {
      tags: ["bookmark-status"],
    });
    return cachedOperation(id);
  }
  const { isBookMark } = await getCachedBookMarkStatus(id);
  const isOwner = getIsOwner(product.userId);
  return (
    <div>
      <div className="relative aspect-square">
        <Image
            className="object-cover"
            fill
            src={`${product.photo}/width=500,height=500`}
            alt={product.title}
            />
      </div>
      <div className="p-5 flex items-center gap-3 border-b border-neutral-700 relative">
        <div className="size-10 overflow-hidden rounded-full">
          {product.user.avatar !== null ? (
            <Image
              src={product.user.avatar}
              width={40}
              height={40}
              alt={product.user.username}
            />
          ) : (
            <UserIcon />
          )}
        </div>
        <div>
          <h3>{product.user.username}</h3>
        </div>
        <div className="size-8 absolute right-5">
          <BookMarkButton isBookMark={isBookMark} productId={id}/>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p>{product.description}</p>
      </div>
      <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-neutral-800 flex justify-between items-center">
        <span className="font-semibold text-xl">
          {formatToWon(product.price)}원
        </span>

        <Link
          className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
          href={``}
        >
          채팅하기
        </Link>
      </div>
    </div>
  );
}

const getCachedProductTitle = nextCache(getProductTitle, ["product-title"], {
  tags: ["product-title"],
});

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getCachedProductTitle(Number(params.id));
  return {
    title: product?.title,
  };
}

export async function generateStaticParams() {
  const products = await db.product.findMany({
    select: {
      id: true,
    },
  });
  return products.map((product) => ({ id: product.id + "" }));
}