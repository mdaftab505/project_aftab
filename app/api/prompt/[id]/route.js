//get request
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const GET = async (req, {params})=>{
   
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');
         if(!prompt) return new Response('prompt not found', {status: 404})     
        return new Response(JSON.stringify(prompt),  {status: 200});
        
    } catch (error) {
        return new Response('prompt not found', {status: 404});
    }

}

//patch request
export const PATCH =async (req, {params}) => {
    const {prompt, tag} = await req.json();

    try {
        await connectToDB();
        const existingPrompt = await  Prompt.findById(params.id);
        if(!existingPrompt) return new Response('Prompt not found', {status:404})
        
        existingPrompt.prompt= prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();
        return new Response(JSON.stringify(prompt),  {status: 200});
        

    } catch (error) {
        return new Response('prompt not found', {status: 404});
    }
    }




//Delete request

export const DELETE =async (req, {params}) => {

    try {
        await connectToDB();
        await Prompt.findByIdAndRemove(params.id);
        return new Response('Prompt Deleted successfully', {status: 200});
    } catch (error) {
        return new Response('failed to delete  not found', {status: 404});
    }
    
}