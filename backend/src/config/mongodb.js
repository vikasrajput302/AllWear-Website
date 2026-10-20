import mongoose from "mongoose";

const connectDB = async () => {
    try{
            await mongoose.connect(`${process.env.MONGODB_URI}/Allear`);
            console.log("Database Connection Successfully");
            
    }
    catch(err){

        console.log("Database connection Error",err);
        process.exit(1);
        

    }
       
    
}

export default connectDB;