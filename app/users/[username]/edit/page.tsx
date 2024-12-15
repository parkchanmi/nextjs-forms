"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserInfoType, userSchema } from "./schema";

import { getUserInfo, updateUserInfo } from "./actions";

export default function EditUserInfo({
  params,
}: {
  params: { username: string };
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfoType>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = handleSubmit(async (data: UserInfoType) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirm_password", data.confirm_password);
    const errors = await updateUserInfo(formData);
    if (errors) {
    }
  });
  const onValid = async () => {
    await onSubmit();
  };

  return (
    <div>
      <form action={onValid} className="p-5 flex flex-col gap-5">
        <h3>Edit Info</h3>
        <Input
          type="email"
          placeholder="email"
          errors={[errors.email?.message ?? ""]}
          {...register("email")}
        />
        <Input
          type="password"
          placeholder="Password"
          errors={[errors.password?.message ?? ""]}
          {...register("password")}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          errors={[errors.confirm_password?.message ?? ""]}
          {...register("confirm_password")}
        />
        <Button text="Edit"/>
      </form>
    </div>
  );
}