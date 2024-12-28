import { Router } from "express";
import { login, signup, verifyUser ,getAllUser} from "../controllers/user.controller.js";
import {authentication} from '../middleware/auth.js';

const route = Router();


route.route('/signup').post(signup);
route.route('/login').post(login);
route.route('/verify').get(verifyUser);
route.route('/').get(getAllUser);


route.route('/dashboard').get(authentication, (req,res)=>{
    res.status(200).json({
        success:true,
        message:`Welcome to dashboard,${req.user.email}`,
    })
})
export default route;