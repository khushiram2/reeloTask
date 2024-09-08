import mongoose from "mongoose";



const connectDb=async()=>{
  try {
    await mongoose.connect(process,env,DB_URL)
    console.log("cb connected")
  } catch (error) {
    console.log(error)
  }
}


export default connectDb
