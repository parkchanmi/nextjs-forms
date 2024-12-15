"use server";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { userSchema } from "./schema";
import getSession from "@/lib/session";
export async function getUserInfo(username:string){
    const user = await db.user.findUnique({
        where: {
            username: username
        },
        select: {
            username:true,
            email:true
        }
    });
    if(user) return user;
    notFound();
}
export async function updateUserInfo(formData: FormData){
    const session = await getSession();
    const data = {
        //email: formData.get("email"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
    };
    const result = await userSchema.spa(data);
    if (!result.success) {
        return result.error.flatten();
    } else {
        const hashedPassword = await bcrypt.hash(result.data.password, 12);
        if (session.id) {
            const user = await db.user.update({
                where: {
                    id: session.id,
                },
                data: {
                   // email: result.data.email,
                    password: hashedPassword,
                },
                select:{
                    username:true
                }
                
            });
            redirect(`/profile`);
        }
    }
}