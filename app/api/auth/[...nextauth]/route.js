import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { connectToDB } from '@utils/database'
import User from '@models/user'


const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId : "182149055747-5k48bb4e2ctit0k0bpgis5fk22l8ckac.apps.googleusercontent.com", 
            clientSecret : "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",
        })
    ],
    secret:"vT5HRYtFi6uh6Du6cpick5weXPodF5EcEb1xEinEws0=",

    callbacks:{
        async session({session}) {


            
                const sessionUser = await User.findOne({email:session.user.email});
    
                session.user.id = sessionUser._id.toString(); 
        
                return session;
                    
            
        },
    
        async signIn({profile, account,user,credentials})  {
            try {

                await connectToDB();
    
                // check if user already exist
                const userExists= await User.findOne({email:profile.email});   
              //if not create a new user
              if(!userExists){
                await User.create({
                    email:profile.email, 
                    username:profile.name.replace(" ", "").toLowerCase(),
                    image:profile.picture, 
                });
              }
    
              return true;
                
            } catch (error) {
                console.log(error);
                throw new Error("Sign-in failed");
            }
        },

    }
   
});

export {handler as GET, handler as POST}