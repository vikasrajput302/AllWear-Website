
import 'dotenv/config';
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";
import app from './src/app.js';


//App Config-------

const port = process.env.PORT || 3000;
 await connectDB()
connectCloudinary();




//server running
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})