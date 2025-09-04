// models/property.types.ts

import { Document } from 'mongoose';

// Enums to match the Dart code
export enum PropertyType {
  Apartment = 'Apartment',
  House = 'House',
}

export enum FurnishedType {
  FullyFurnished = 'fully-furnished',
  SemiFurnished = 'semi-furnished',
  Unfurnished = 'unfurnished',
}

// Base interface for all properties
// It extends Mongoose.Document to get properties like _id, etc.
export interface IProperty extends Document {
  type: PropertyType;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  bhk: number;
  area: number; // in sqft or sqm
  isAvailable: boolean;
  ownerId: string; // Or Schema.Types.ObjectId if you have a User model
  amenities: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Interface for Apartments, inheriting from IProperty
export interface IApartment extends IProperty {
  floor: number;
  hasElevator: boolean;
  hasSecurity: boolean;
  apartmentNumber: string;
  hasParking: boolean;
  hasBalcony: boolean;
}

// Interface for Houses, inheriting from IProperty
export interface IHouse extends IProperty {
  floors: number;
  hasGarden: boolean;
  hasPool: boolean;
  landArea: number;
  isFurnished: boolean; // Corresponds to the Dart model's boolean
}