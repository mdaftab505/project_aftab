import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { connectToDB } from '@utils/database'
import User from '@models/user'


const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID, 
            clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    secret:"vT5HRYtFi6uh6Du6cpick5weXPodF5EcEb1xEinEws0=",

    callbacks:{
        async session({session}) {


            
                const sessionUser = await User.findOne({email:session?.user?.email});
    
                session.user.id = sessionUser._id.toString(); // @ts-ignore 
        
                return session;
                    
            
        },
    
        async signIn({profile, account,user,credentials})  {
            try {

                await connectToDB();
    
                // check if user already exist
                const userExists= await User.findOne({email:profile.email});     // @ts-ignore 
              //if not create a new user
              if(!userExists){
                await User.create({
                    email:profile.email, // @ts-ignore 
                    username:profile.name.replace(" ", "").toLowerCase(),// @ts-ignore 
                    image:profile.picture, // @ts-ignore 
                });
              }
    
              return true;
                
            } catch (error) {
                console.log(error);
                return false
            }
        },

    }
   
});

export {handler as GET, handler as POST}