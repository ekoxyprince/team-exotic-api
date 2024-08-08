import express from "express";
const router: express.Router = express.Router();
import * as controller from "../controllers/index.controller";
import auth from "../middlewares/auth.middleware";
import upload from "../middlewares/upload.middleware";
import { carValidationRules } from "../validations";

router.route("/car").get(controller.getCarsPaginated);
router
  .route("/cars")
  .get(controller.getCars)
  .post(
    [auth],
    [upload.array("image")],
    carValidationRules(),
    controller.createCar
  );
router
  .route("/car/:id")
  .patch([auth], controller.updateSingleCar)
  .get(controller.getSingleCar)
  .delete([auth], controller.deleteSingleCar);
router.route("/search_car").get(controller.findByFilter);
router
  .route("/brand")
  .get(controller.findAllBrands)
  .post([auth, upload.single("image")], controller.createBrand);
router
  .route("/brand/:id")
  .get(controller.findSingleBrand)
  .patch([auth, upload.single("image")], controller.updateBrand)
  .delete([auth], controller.deleteBrand);
router
  .route("/other_cars")
  .get(controller.findOtherCarsExcept);
router
  .route("/client")
  .get(controller.findAllClients)
  .post([upload.array("image")], controller.findOrCreateUser);
router
  .route("/create_client")
  .post([upload.array("image")], controller.createUserForOrder);
router
  .route("/client/:driverLicenseNumber")
  .get([auth],controller.findUser);
router
.route("/checkout")
.post([upload.array("image")],controller.testStripe)
router
.route("/find_client/:id")
.get([auth],controller.findById)
router
.route("/payment/success")
.get(controller.createUserPayment)
router
.route("/payment/cancel")
.get(controller.createUserPayment)

export default router;
