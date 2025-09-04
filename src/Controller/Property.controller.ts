import { Request, Response } from "express";
import { Property } from "../Model/property.Model";
import {
  ErrorHandler,
  ServerErrorHandler,
  SuccssHandler,
} from "../utils/request";
import {
  IApartment,
  IHouse,
  PropertyType,
} from "../Interface/Property.interface";
import { updateUserModel } from "./User.controller";
import mongoose from "mongoose";
import { IAuth, IAuthRequest } from "../Interface/Auth.interface";

// create property
export const createPropertyModel = async (req: IAuth, res: Response) => {
  try {

     const firebaseUid = req.user?.uid;
    const userRole = req.user?.role; // Assumes you have a custom claim named 'role'

    // 2. Authorize the user: only 'owner' can create properties
    if (!firebaseUid) {
      return ErrorHandler(res, "Unauthorized: User not authenticated.",);
    }
    if (userRole !== 'owner') {
      return res.status(403).json({message: "Fobidden: only owner can create property"})
    }


    const { type, ...rest } = req.body;


    if (!type) {
      return res.status(400).json({ message: "Property type is required." });
    }
    const propertyData = {
      ...rest,
      type,
      ownerId: firebaseUid, // <-- Using Firebase UID as the owner identifier
    };

      


     if (type === PropertyType.Apartment) {
      const apartmentData = rest as IApartment;
      if (
        apartmentData.floor === undefined ||
        apartmentData.apartmentNumber === undefined
      ) {
        return ErrorHandler(res, "Missing required apartment fields: floor and apartmentNumber.");
      }
    } else if (type === PropertyType.House) {
      const houseData = rest as IHouse;
      if (houseData.landArea === undefined) {
        return ErrorHandler(res, "Missing required house field: landArea.");
      }
    } else {
        return ErrorHandler(res, "Invalid property type specified.");
    }
     const property = new Property(propertyData);
    await property.save();
    
    // return SuccssHandler(res, property, "created successfully");
    return res.status(201).json({message: "property created successfully."})
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// access all properties
export const allPropertyModel = async (req: Request, res: Response) => {
  try {
    const property = await Property.find();
    property
      ? SuccssHandler(res, property, "All users fetch success.")
      : ErrorHandler(res, "Unable to fetch  users.");
  } catch (e) {
    ServerErrorHandler(res, e);
  }
};

// update properties by id


export const updatePropertyModel = async (req: IAuthRequest, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;

  try {
    // 1. Get the Firebase user's UID and role from the request object
    const firebaseUid = req.user?.uid;
    const userRole = req.user?.role; // Assumes a custom claim named 'role'

    // 2. Authorize the user
    if (!firebaseUid) {
      return ErrorHandler(res, "Unauthorized: User not authenticated.");
    }
    // A tenant should never be able to update a property
    if (userRole === 'tenant') {
        return ErrorHandler(res, "Forbidden: You do not have permission to update properties.");
    }

    // 3. Find the property to be updated
    const property = await Property.findById(id);
    
    if (!property) {
      return ErrorHandler(res, "Property not found.");
    }

    // 4. Verify ownership: The user's UID must match the property's ownerId
    if (property.ownerId.toString() !== firebaseUid) {
      return ErrorHandler(res, "Forbidden: You are not the owner of this property.");
    }

    // 5. If authorized, proceed with the update
    const updatedProperty = await Property.findByIdAndUpdate(id, updateData, {
      new: true, // Returns the updated document
      runValidators: true, // Ensures updates adhere to schema validation
    });

    return SuccssHandler(
      res,
      updatedProperty,
      "Property is successfully updated."
    );

  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getOwnerProperty = async (req: IAuthRequest, res: Response)=>{
  try{
    const ownerId = req.user?.uid;

    if (!ownerId){
      return res.status(401).json({message:"Unauthorized: User Id not found"});
    }
    const properties = await Property.find({ownerId: ownerId})
    return SuccssHandler(res, properties, "Owner's properties fetched successfully.") 

  }catch(e){
    res.status(500).json({message: e});
  }
}