import { config } from "dotenv";
import mongoose from "mongoose";

config()

export async function connectDatabase(){
    try{
        const uri = process.env.MONGOURL!;
        await mongoose.connect(uri);
        console.log("database is connected 🥂");

    }catch(e){
        console.log(e);
    }
}


export async function disconnectDatabase() {
  try {
    if (mongoose.connection.readyState) {
      await mongoose.disconnect();
      console.log("Database is disconnected");
    }
  } catch (error) {
    console.error(error);
  }
}
