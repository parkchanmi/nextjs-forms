"use client";

import Button from "@/components/button";
import TextArea from "@/components/textarea";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { getUploadUrl, uploadTweet } from "./actions";
import { useFormState } from "react-dom";
import { tweetSchema, TweetType } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AddProduct() {
  const [preview, setPreview] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  //const [photoId, setImageId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const {
      register,
      handleSubmit,
      setValue,
      setError,
      formState: { errors },
    } = useForm<TweetType>({
      resolver: zodResolver(tweetSchema),
    });

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
          target: { files },
        } = event;
        if (!files) {
          return;
        }
        const file = files[0];
        const url = URL.createObjectURL(file);
        setPreview(url);
        setFile(file);
        const { success, result } = await getUploadUrl();
        if (success) {
          const { id, uploadURL } = result;
          setUploadUrl(uploadURL);
          //setImageId(id);
          setValue(
            "photo",
            `https://imagedelivery.net/_bTh0GEeTCX8i_HG49MDGQ/${id}`
          );
        }
  };
  const onSubmit = handleSubmit(async (data: TweetType) => {
      if (!file) {
        return;
      }
      const cloudflareForm = new FormData();
      cloudflareForm.append("file", file);
      const response = await fetch(uploadUrl, {
        method: "post",
        body: cloudflareForm,
      });
      if (response.status !== 200) {
        return;
      }
      /*const photoUrl = `https://imagedelivery.net/_bTh0GEeTCX8i_HG49MDGQ/${photoId}`;
      formData.set("photo", photoUrl);
      return uploadProduct(_, formData);*/
      const formData = new FormData();
        formData.append("content", data.content);
        formData.append("photo", data.photo);
        const errors = await uploadTweet(formData);
        if (errors) {
          // setError("")
        }
      });
      const onValid = async () => {
        await onSubmit();
      };
  return (
    <div>
      <form action={onValid} className="p-5 flex flex-col gap-5">
        <label
          htmlFor="photo"
          className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
          style={{
            backgroundImage: `url(${preview})`,
          }}
        >
          {preview === "" ? (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">
                사진을 추가해주세요.
                {errors.photo?.message}
              </div>
            </>
          ) : null}
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          className="hidden"
        />
        <TextArea
          {...register("content")}
          required
          placeholder="내용"
          errors={[errors.content?.message ?? ""]}
        />
        <Button text="작성 완료" />
      </form>
    </div>
  );
}