import mongoose from "mongoose";

const connectDB = async () => {
    try{

        mongoose.connection.on('connected',()=>{
            console.log('DB connected');
            
        })
            await mongoose.connect(`${process.env.MONGODB_URI}/Allear`);
            
            
    }
    catch(err){

        console.log("Database connection Error",err);
        process.exit(1);
        

    }
       
    
}

export default connectDB;