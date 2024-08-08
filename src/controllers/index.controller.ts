import CarService from "../services/carservices/car.services";
import BrandServices from "../services/carservices/brand.services";
import catchAsync from "../utilities/catchasync";
import { Params } from "../services/carservices/car.services";
import ClientService from "../services/userservices/client.services";
import { ObjectId } from "mongoose";
import PaymentService from "../services/paymentservices/payment.services";
import OrderService from "../services/carservices/order.services";
import { UserParams } from "../services/userservices/client.services";
import config from "../config";

export const createCar = catchAsync(async (req, res) => {
  const carService = new CarService(req.body, <Express.Multer.File[]>req.files);
  const data = await carService.create();
  res.status(201).json({
    success: true,
    status: 201,
    message: "Created successfully!",
    data,
  });
});
export const getCars = catchAsync(async (req, res) => {
  const data = await CarService.findAll(req.query);
  res.status(200).json({
    success: true,
    status: 200,
    message: "Fetched successfully!",
    data,
  });
});
export const getCarsPaginated = catchAsync(async (req, res) => {
  const data = await CarService.findWithPagination(<Params | any>req.query);
  res.status(200).json({
    success: true,
    status: 200,
    message: "Fetched successfully!",
    data,
  });
});
export const getSingleCar = catchAsync(async (req, res) => {
  const data = await CarService.findById(<ObjectId | string>req.params.id);
  res.status(200).json({
    success: true,
    status: 200,
    message: "Fetched successfully!",
    data,
  });
});
export const updateSingleCar = catchAsync(async (req, res) => {
  const carService = new CarService(req.body);
  const data = await carService.update(<ObjectId | string>req.params.id);
  res.status(200).json({
    success: true,
    status: 200,
    message: "Updated successfully!",
    data,
  });
});

export const deleteSingleCar = catchAsync(async (req, res) => {
  const data = await CarService.delete(<ObjectId | string>req.params.id);
  res.status(204).json({
    success: true,
    status: 204,
    message: "Updated successfully!",
    data,
  });
});
export const findByFilter = catchAsync(async (req, res) => {
  const data = await CarService.findByFilter(<Params | any>req.query);
  res.status(200).json({
    success: true,
    status: 200,
    message: "fetched successfully!",
    data,
  });
});

export const createBrand = catchAsync(async (req, res) => {
  const data = await new BrandServices(
    req.body,
    <Express.Multer.File>req.file!
  ).saveBrand();
  res.status(201).json({
    success: true,
    status: 201,
    message: "Brand created",
    data,
  });
});
export const updateBrand = catchAsync(async (req, res) => {
  const data = await new BrandServices(
    req.body,
    <Express.Multer.File>req.file!
  ).updateBrand(req.params.id);
  res.status(200).json({
    success: true,
    status: 200,
    message: "Brand updated",
    data,
  });
});
export const findSingleBrand = catchAsync(async (req, res) => {
  const data = await BrandServices.findSingleBrand(
    <ObjectId | string>req.params.id
  );
  res.status(200).json({
    success: true,
    status: 200,
    message: "Brand found!",
    data,
  });
});
export const findAllBrands = catchAsync(async (req, res) => {
  const data = await BrandServices.findAllBrands();
  res.status(200).json({
    success: true,
    status: 200,
    message: "Brand found!",
    data,
  });
});
export const deleteBrand = catchAsync(async (req, res) => {
  const data = await BrandServices.deleteBrand(
    <ObjectId | string>req.params.id
  );
  res.status(200).json({
    success: true,
    status: 200,
    message: "Brand deleted!",
    data,
  });
});
export const findOtherCarsExcept = catchAsync(async (req, res) => {
  const data = await CarService.findOtherCarsExcept(req.query);
  res.status(200).json({
    success: true,
    status: 200,
    message: "Cars Found!",
    data,
  });
});
export const createUserForOrder = catchAsync(async (req, res) => {
  const data = await new ClientService(
    req.body,
    <Express.Multer.File[]>req.files
  ).create();
  res.status(201).json({
    success: true,
    status: 201,
    message: "Client created",
    data,
  });
});
export const findOrCreateUser = catchAsync(async (req, res) => {
  const data = await new ClientService(
    req.body,
    <Express.Multer.File[]>req.files
  ).findOrCreateClient();
  res.status(201).json({
    success: true,
    status: 201,
    message: "Client created or found!",
    data,
  });
});
export const findUser = catchAsync(async (req, res) => {
  const data = await ClientService.findClient(
    <number | any>req.params.driverLicenseNumber
  );
  res.status(200).json({
    success: true,
    status: 200,
    message: "Client found!",
    data,
  });
});
export const testStripe = catchAsync(async (req, res) => {
  const data = await new OrderService(req.body, req.files!).createOrder();
  console.log(data);
  res.status(201).json({
    success: true,
    status: 201,
    message: "Payment started!",
    data: {
      authorization_url: data.url,
    },
  });
});
export const findAllClients = catchAsync(async (req, res) => {
  const data = await ClientService.findByFilter(<UserParams | any>req.query);
  res.status(200).json({
    success: true,
    status: 200,
    message: "Clients found!",
    data,
  });
});
export const findById = catchAsync(async (req, res) => {
  const data = await ClientService.findById(<ObjectId | any>req.params.id);
  res.status(200).json({
    success: true,
    status: 200,
    message: "Client found!",
    data,
  });
});
export const createUserPayment = catchAsync(async (req, res) => {
  const data: any = await PaymentService.createUserPayment(
    <string>req.query.session_id
  );
  let redirectQuery = data.status == "paid" ? "success" : "failed";
  res
    .status(303)
    .redirect(`${config.client_url}/payment?status=${redirectQuery}`);
});
