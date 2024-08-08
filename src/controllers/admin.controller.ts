import catchAsync from "../utilities/catchasync";
import UserService from "../services/userservices/user.services";
import OrderService, { OrderParams } from "../services/carservices/order.services";
import ClientService from "../services/userservices/client.services";
import PaymentService, { PaymentParams } from "../services/paymentservices/payment.services";

export const getAdminDetails = catchAsync(async (req, res) => {
  const data = new UserService(req.user!).getDetails();
  res.status(200).json({
    success: true,
    status: 200,
    message: "success",
    data,
  });
});

export const updateAdminDetails = catchAsync(async (req, res) => {
  const data = new UserService(req.user!).updateDetails(req.body,<Express.Multer.File[]>req.files!);
  res.status(204).json({
    success: true,
    status: 204,
    message: "updated successfully!",
    data,
  });
});

export const findAllOrders = catchAsync(async(req,res)=>{
  const data = await OrderService.findByFilter(<OrderParams|any>req.query)
  res.status(200).json({
    success: true,
    status: 200,
    message: "Orders found!",
    data,
  });
})
export const findSingleOrder = catchAsync(async(req,res)=>{
  const data = await OrderService.findById(req.params.id)
  res.status(200).json({
    success: true,
    status: 200,
    message: "Order found!",
    data,
  });
})

export const findAndUpdateOrder = catchAsync(async(req,res)=>{
  const data = await OrderService.findAndUpdate(req.params.id,req.body)
  res.status(200).json({
    success: true,
    status: 200,
    message: "Order updated!",
    data,
  });
})
export const findAndDeleteOrder = catchAsync(async(req,res)=>{
  const data = await OrderService.findAndDelete(req.params.id)
  res.status(204).json({
    success: true,
    status: 204,
    message: "Order deleted!",
    data,
  });
})
export const verifyUser = catchAsync(async(req,res)=>{
  const data = await ClientService.findAndUpdate(req.params.id)
  res.status(200).json({
    success: true,
    status: 200,
    message: "Client updated!",
    data,
  });
})
export const getPayments = catchAsync(async(req,res)=>{
  const data = await PaymentService.fetchAllPayments(<PaymentParams|any>req.query)
  res.status(200).json({
    success: true,
    status: 200,
    message: "Payments found!",
    data,
  });
})
export const deletePayment = catchAsync(async(req,res)=>{
  const data = await PaymentService.deletePayment(req.params.id)
  res.status(204).json({
    success: true,
    status: 204,
    message: "Payment deleted!",
    data,
  });
})
export const fetchDashboardData = catchAsync(async(req,res)=>{
  const data = await new UserService(req.user!).getDashboardDetails()
  res.status(200).json({
    success: true,
    status: 200,
    message: "Details found!",
    data,
  });
})
