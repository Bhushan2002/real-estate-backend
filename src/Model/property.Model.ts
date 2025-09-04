// models/property.model.ts

import { Schema, model, Model } from 'mongoose';
import { IApartment, IHouse, IProperty, PropertyType } from '../Interface/Property.interface';


// Options for the discriminator key
const discriminatorKey = 'type';

// 1. BASE PROPERTY SCHEMA
// This schema includes all fields that are common to all property types.
const propertySchema = new Schema<IProperty>({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  location: { type: String, required: true },
  images: { type: [String], required: true, default: [] },
  bedrooms: { type: Number, required: true, min: 0 },
  bathrooms: { type: Number, required: true, min: 0 },
  bhk: { type: Number, required: true, min: 0 },
  area: { type: Number, required: true, min: 0 },
  isAvailable: { type: Boolean, default: true },
  // Assuming you have a User model, you would link it like this:
  ownerId: { type: String, ref: 'User', required: true },
  // ownerId: { type: String, required: true },
  amenities: { type: [String], default: [] },
}, {
  // Mongoose will automatically add `createdAt` and `updatedAt` fields
  timestamps: true,
  // This is the key that will differentiate between Apartments and Houses
  discriminatorKey: discriminatorKey,
});

// 2. BASE PROPERTY MODEL
// We create the base model from the schema.
export const Property = model<IProperty>('Property', propertySchema);


// 3. APARTMENT MODEL (using a discriminator)
// This model will be stored in the SAME collection as 'Property'
// It inherits propertySchema and adds its own fields.
export const Apartment: Model<IApartment> = Property.discriminator<IApartment>(
  PropertyType.Apartment,
  new Schema<IApartment>({
    floor: { type: Number, required: true, min: 0 },
    hasElevator: { type: Boolean, default: false },
    hasSecurity: { type: Boolean, default: false },
    apartmentNumber: { type: String, trim: true },
    hasParking: { type: Boolean, default: false },
    hasBalcony: { type: Boolean, default: false },
  })
);

// 4. HOUSE MODEL (using a discriminator)
// This model will also be stored in the 'properties' collection.
export const House: Model<IHouse> = Property.discriminator<IHouse>(
  PropertyType.House,
  new Schema<IHouse>({
    floors: { type: Number, default: 1 },
    hasGarden: { type: Boolean, default: false },
    hasPool: { type: Boolean, default: false },
  landArea: { type: Number, min: 0 },
    isFurnished: { type: Boolean, default: false },
  })
);