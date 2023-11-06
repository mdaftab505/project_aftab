import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database"





export const GET =async (req, {params}) => {

    
 
     try {
             connectToDB();

             console.log(params.id)
             const prompt = await Prompt.find({creator:params.id}).populate('creator');
        
             return new Response(JSON.stringify(prompt),  {status: 200});


     } catch (error) {
        return new Response('prompt not found',  {status: 200});

        
     }
    
    
}