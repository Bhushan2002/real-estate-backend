import { Router } from "express";
import {
  createUserModel,
  deleteUserModel,
  getAllUserModel,
  getUserModel,
  getUserTokenModel,
  loginUserModel,
  updateUserModel,
} from "../Controller/User.controller";
import AuthMiddleware from "../middleware/Auth.middleware";

const router = Router();

// create user Model
router.route("/").post(createUserModel);
router.use("/details", AuthMiddleware);
router
  .route("/details")
  .get(getUserTokenModel)

router.route("/getUsers").get(getAllUserModel);
router.route('/:id').put(updateUserModel)
router.route("/:id").delete(deleteUserModel);

router.route("/details/:id").get(getUserModel);
router.route("/login").post(loginUserModel);

export default router;
