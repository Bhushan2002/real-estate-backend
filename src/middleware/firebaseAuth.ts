import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";
import { IAuthRequest } from "../Interface/Auth.interface";



export const firebaseAuthMiddleware = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No token provided." });
  }
  const db = admin.firestore();
  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const userDocRef = db.collection("users").doc(uid);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      return res
        .status(403)
        .json({ message: "Forbidden: User profile not found in database." });
    }
    const userData = userDoc.data();
    const userRole = userData?.role;
    if (!userRole){
             return res.status(403).json({ message: 'Forbidden: Role not assigned to user.' });

    }
    req.user = {
      ...decodedToken,
      role: userRole,
      ...userData
    };

    next(); // Proceed to the next middleware or controller
  } catch (error) {
    console.error("Error verifying Firebase ID token:", error);
    return res.status(403).json({ message: "Unauthorized: Invalid token." });
  }
};
