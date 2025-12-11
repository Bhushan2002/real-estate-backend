import express from "express";
import { connectDatabase } from "./utils/db";
import userRoutes from "../src/Routes/User.routes";
import propertRoutes from "../src/Routes/Property.route";
import messageRoutes from '../src/Routes/Message.routes';
import { Response } from 'express';
import cors from 'cors'
var admin = require("firebase-admin");

var serviceAccount = require('./../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// app config

const app = express();
const db = admin.firestore();

//middleware config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

connectDatabase();

const port = 9000;
// api routes
app.get("/", (req: any, res: any) => {
  res.json({ message: "hello" });
});


app.get('/api/users/:userId', async(req: any, res: any)=>{
    try{
        const userId = req.params.userId;
        const userDoc = await db.collection('users').doc(userId).get();

        if (!userDoc.exists){
            return res.status(400).json({message: "user not found"})

        }
        
        res.status(200).send(userDoc.data());
    }catch(e){
        res.status(500).send({message: "Internet Server Error."})
    }
    
})


app.use("/user", userRoutes);
app.use("/properties", propertRoutes);
app.use('/message',messageRoutes)
//listeners
app.listen(port, () => {
  console.log(`connected at ${port}`);
});
