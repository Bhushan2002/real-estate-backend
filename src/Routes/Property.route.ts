import { Router } from "express";
import {   allPropertyModel, createPropertyModel, getOwnerProperty, getPropertyByCity, getPropertyByFilters, updatePropertyModel } from "../Controller/Property.controller";
import { firebaseAuthMiddleware } from "../middleware/firebaseAuth";
import multer from "multer";


const router = Router();

const update = multer().array('images',10);

router.post('/createproperty',firebaseAuthMiddleware, update,createPropertyModel);
router.route('/all-properties').get(allPropertyModel);
router.route('/:id').put(update,updatePropertyModel);
router.get('/ownerproperties',firebaseAuthMiddleware,getOwnerProperty);
router.get('/:city',getPropertyByCity);
router.get('/filter',getPropertyByFilters)
export default router;