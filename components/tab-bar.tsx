"use client";

import {
  HomeIcon as SolidHomeIcon,
  NewspaperIcon as SolidNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as SolidChatIcon,
  VideoCameraIcon as SolidVideoCameraIcon,
  UserIcon as SolidUserIcon,
  BookmarkIcon as SolidBookMarkIcon,
  MagnifyingGlassIcon as SolidGlassIcon
} from "@heroicons/react/24/solid";
import {
  HomeIcon as OutlineHomeIcon,
  NewspaperIcon as OutlineNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
  VideoCameraIcon as OutlineVideoCameraIcon,
  UserIcon as OutlineUserIcon,
  BookmarkIcon as OutlineBookMarkIcon,
  MagnifyingGlassIcon as OutlineGlassIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 w-full mx-auto max-w-screen-md grid grid-cols-5 border-neutral-600 border-t px-5 py-3 *:text-white bg-neutral-800">
      <Link href="/home" className="flex flex-col items-center gap-px">
        {pathname === "/home" ? (
          <SolidHomeIcon className="w-7 h-7" />
        ) : (
          <OutlineHomeIcon className="w-7 h-7" />
        )}
        <span>홈</span>
      </Link>
      <Link href="/tweets" className="flex flex-col items-center gap-px">
        {pathname === "/tweets" ? (
          <SolidNewspaperIcon className="w-7 h-7" />
        ) : (
          <OutlineNewspaperIcon className="w-7 h-7" />
        )}
        <span>동네생활</span>
      </Link>
      <Link href="/search" className="flex flex-col items-center gap-px">
        {pathname === "/search" ? (
          <SolidGlassIcon className="w-7 h-7" />
        ) : (
          <OutlineGlassIcon className="w-7 h-7" />
        )}
        <span>검색</span>
      </Link>
      <Link href="/bookmark" className="flex flex-col items-center gap-px">
        {pathname === "/bookmark" ? (
          <SolidBookMarkIcon className="w-7 h-7" />
        ) : (
          <OutlineBookMarkIcon className="w-7 h-7" />
        )}
        <span>즐겨찾기</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center gap-px">
        {pathname === "/profile" ? (
          <SolidUserIcon className="w-7 h-7" />
        ) : (
          <OutlineUserIcon className="w-7 h-7" />
        )}
        <span>나의 당근</span>
      </Link>
    </div>
  );
}