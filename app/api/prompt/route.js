import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const GET = async (req)=>{
   
    try {
        await connectToDB();

        const prompt = await Prompt.find({}).populate('creator');
        
        return new Response(JSON.stringify(prompt),  {status: 200});
        
    } catch (error) {
        return new Response('prompt not found', {status: 404});
    }

}