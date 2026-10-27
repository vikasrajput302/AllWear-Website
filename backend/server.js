
import 'dotenv/config';
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";
import app from './src/app.js';


//App Config-------


const port = process.env.PORT || 3000;
connectCloudinary();




//server running
try {
    await connectDB();
    app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
} catch (error) {
    process.exit(1);
    
}