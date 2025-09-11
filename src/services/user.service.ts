import { User } from "../types/user";
import { db } from "../util/db";

export class UserService{
    constructor(){}

    async getUserById(userId:string): Promise<User>{
        if(!userId){
            throw new Error("User id missing");
        }
        const user = await db.dashboard_user.findUnique({
            where:{
                id: userId
            },
            select:{
                email: true,
                createdAt: true,
                updatedAt: true,
                isLocked: true
            }
        });
        if(!user){
            throw new Error("user not found");
        }
        return user;
    }

    async getUserByEmail(email:string){
        if(!email){
            throw new Error("Email required");
        }
        const user = await db.dashboard_user.findUnique({
            where:{
                email: email
            }
        });
        if(!user){
            throw new Error("User not found");
        }
        if(user.isLocked){
            throw new Error("User is locked");
        }

        return user;


    }
}