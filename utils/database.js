import mongoose from "mongoose";

let isConnected= false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log('Mongoose is already connected');
        return;
    }

    try {
          await mongoose.connect("mongodb+srv://mdaftab:aftab123@atlascluster.qrmqags.mongodb.net/?retryWrites=true&w=majority",{
            dbName: 'share_prompt',
            useNewUrlParser:true,
            useUnifiedTopology:true,
          });
          isConnected=true;
          console.log('Mongodb is connected')
    } catch (error) {
        console.log(error);
    }
}