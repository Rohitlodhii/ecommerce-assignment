import { DefaultSession, getServerSession, NextAuthOptions } from "next-auth";
import { prisma } from "./db";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";


declare module "next-auth" {
    export interface Session extends DefaultSession {
        user : {
            id : string ,
            credits : number,
        } & DefaultSession["user"]
    }
}


declare module "next-auth/jwt" {
    interface JWT {
        id : string,
        credits : number,
    }
}

export const authOptions : NextAuthOptions = {
    session : {
        strategy : "jwt"
    },
    callbacks : {
        jwt : async ({token}) => {
            const db_user = await prisma.user.findFirst({
                where : {
                    email : token.email!
                }
            })
            if(db_user){
                token.id = db_user.id
                token.credits = db_user.credits
            }

            return token
        },

        session : ({session , token}) => {
            if(token){
                session.user.id = token.id 
                session.user.name = token.name
                session.user.email = token.email 
                session.user.image = token.picture
                session.user.credits = token.credits


            }
            return session
        }
    },
    providers : [
        Google({
            clientId : process.env.AUTH_GOOGLE_ID!,
            clientSecret : process.env.AUTH_GOOGLE_SECRET!
        })
    ] ,
    adapter : PrismaAdapter(prisma),
    secret : process.env.AUTH_SECRET
    
    
}


export const getAuthSession = () => {
    return getServerSession(authOptions);
}