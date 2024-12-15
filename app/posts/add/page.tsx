"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostType, postSchema } from "./schema";
import { uploadPost } from "./actions";

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostType>({
    resolver: zodResolver(postSchema),
  });
  
  const onSubmit = handleSubmit(async (data: PostType) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    const errors = await uploadPost(formData);
    if (errors) {
      // setError("")
    }
  });
  const onValid = async () => {
    await onSubmit();
  };
  //const [state, action] = useFormState(interceptAction, null);
  return (
    <div>
      <form action={onValid} className="p-5 flex flex-col gap-5">
        <Input
          required
          placeholder="제목"
          type="text"
          {...register("title")}
          errors={[errors.title?.message ?? ""]}
        />
        <Input
          type="text"
          required
          placeholder="자세한 설명"
          {...register("description")}
          errors={[errors.description?.message ?? ""]}
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}