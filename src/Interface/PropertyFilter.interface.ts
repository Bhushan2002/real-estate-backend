import { Double } from "mongoose";
import { PropertyType } from "./Property.interface";

export interface PropertyFilter extends Document{
    propertyType: PropertyType,
    minPrice : number,
    maxPrice : number,
    bhk: number,
    furnished: String,
};