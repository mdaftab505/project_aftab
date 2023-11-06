import {  Schema, models, model  } from "mongoose";


const promptSchema = new Schema({
    creator:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:[true,'user not logged in']
    },
    prompt:{
        type:String,
        required:[ true, 'Propmpt is required']
    },
    tag:{
       type:String,
       required:[true, 'Tag is requied']
    }
    
});


const Prompt = models.Prompt || model('Prompt', promptSchema);

export default Prompt