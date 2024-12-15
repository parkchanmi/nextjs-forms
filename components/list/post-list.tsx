"use client";
import ListPost from "../item/item-post";
import { useState } from "react";
import { InitialPosts } from "@/app/(tabs)/life/page";

interface PostListProps {
  initialPosts: InitialPosts;
}

export default function PostList({ initialPosts }: PostListProps) {
  const [posts, setPosts] = useState(initialPosts);

  return (
    <div className="p-5 flex flex-col">
        {posts.map((post) => (
          <ListPost key={post.id} {...post} />
        ))}
    </div>
  );
}