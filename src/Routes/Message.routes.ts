import { Router } from "express";
import { firebaseAuthMiddleware } from "../middleware/firebaseAuth";
import { createMessage } from "../Controller/message.Controller";



const router = Router();


router.post('/create',createMessage);


export default router;