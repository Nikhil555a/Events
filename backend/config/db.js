import mongoose from "mongoose"


const connectDb = async()=>{
    try {
      mongoose.connect(process.env.MONGO_URL)
      console.log("MongoDB Connected")  
    } catch (error) {
        console.log("MongoDB Not Connected")
        
    }
}
export default connectDb