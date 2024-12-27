import 'dotenv/config'

import app from './app.js'
import connectDB from './DB/database.js';
const port = 3000 ||process.env.PORT;



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})

connectDB();