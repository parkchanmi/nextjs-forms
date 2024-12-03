import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}
export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
    <div className="flex flex-col gap-2 *:font-medium">
      <h1 className="text-2xl">Profile</h1>
      <div className="*:mt-10">
        <h3 className="text-xl">userName : {user?.username}</h3>
        <h3 className="text-xl">email : {user?.email}</h3>
      </div>
      

    </div>
    <form action={logOut}>
        <button className="primary-btn text-lg py-2.5">Log out</button>
    </form>
  </div>
  );
}