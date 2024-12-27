import express from 'express'


const app = express();
import userRoute from './routes/user.route.js';

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api/v1/user',userRoute);

app.get('/',(req,res)=>{
    res.send("App is runnig fine..")
})

export default app;