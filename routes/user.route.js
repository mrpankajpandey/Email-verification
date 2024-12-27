import { Router } from "express";
import { login, signup, verifyUser ,getAllUser} from "../controllers/user.controller.js";


const route = Router();


route.route('/signup').post(signup);
route.route('/login').post(login);
route.route('/verify').get(verifyUser);
route.route('/').get(getAllUser);


export default route;