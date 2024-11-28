import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function test(){
    /*const user = await db.user.findMany({
        where:{
            username:{
                contains:"est"
            }
        },
    });
    console.log(user);
*/
    /*const token = await db.sMSToken.create({
        data:{
            token:"1212",
            user:{
                connect:{
                    id:3,
                }
            }
        }
    });*/
    const token = await db.sMSToken.findUnique({
        where:{
            id:1,
        },
        include:{
            user:true,
        }
    });
    console.log(token);
}


test();
export default db;