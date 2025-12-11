import { Router } from "express";
import { firebaseAuthMiddleware } from "../middleware/firebaseAuth";
import { sendMessage } from "../Controller/message.Controller";



const router = Router();

router.use(firebaseAuthMiddleware);

router.post('/send',sendMessage);


export default router;