import {body } from "express-validator";

export const checkName = body("name")
.notEmpty()
.withMessage("Car name is required");

export const checkCategory = body("category")
.notEmpty()
.withMessage("Category is required");

export const checkPerson = body("person")
.notEmpty()
.withMessage("Person is required")
.isNumeric()
.withMessage("Must be numbers");

export const checkPrice = body("price")
.notEmpty()
.withMessage("Price is required")
.isNumeric()
.withMessage("Must be numbers");

export const checkService = body("service")
.notEmpty()
.withMessage("Service is required");

export const checkDuration = body("duration")
.notEmpty()
.withMessage("Duration is required")
.isNumeric()
.withMessage("Must be numbers");

export const checkDurationUnit = body("durationUnit")
.notEmpty()
.withMessage("Duration Unit is required");

export const checkTransmission = body("transmision")
.notEmpty()
.withMessage("Transmision is required");

export const checkFuel = body("fuel")
.notEmpty()
.withMessage("Fuel is required");

export const checkTripMile = body("tripMile")
.notEmpty()
.withMessage("Trip mile is required")
.isNumeric()
.withMessage("Must be number");

export const checkDescription = body("description")
.notEmpty()
.withMessage("Description is required");

export const checkImages = body("")
.custom((value,{req})=>{
  if(req.files && req.files.length >4){
    return true
  }
  throw new Error("At least 4 images required")
})

