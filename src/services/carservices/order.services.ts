import PaymentService from "../paymentservices/payment.services";
import ClientService from "../userservices/client.services";
import Order, { OrderDocument } from "../../database/models/order.model";
import Client, { ClientDocument } from "../../database/models/client.model";
import CarService from "./car.services";
import _ = require("lodash");
import { PaymentBody } from "../paymentservices/payment.services";
import { CarDocument } from "../../database/models/car.model";
import { ObjectId } from "mongoose";
import { AuthorizationError } from "../../exceptions/error";
import mailer from "../../helpers/mail";

export interface OrderParams {
  limit: number;
  pages: number | null;
  status?: string | null;
  q?: string | null;
}
interface Query {
  status?: string;
}
interface OrderRequestBody extends ClientDocument, OrderDocument {}

export default class OrderService {
  constructor(
    readonly body: OrderRequestBody,
    readonly files: Express.Multer.File[]
  ) {
    this.body = body;
    this.files = files;
  }
  async createOrder() {
    const clientService = new ClientService(this.body, this.files);
    const client = await clientService.findOrCreateClient();
    if (client.status !== "verified") {
      await mailer.registration(client.firstname,client.email)
      await mailer.adminVerification()
      throw new AuthorizationError("Account must be verified to proceed!");
    }
    const car: CarDocument | null = (await CarService.findById(
      this.body.id
    )) as CarDocument;
    const order = await Order.create({
      ...this.body,
      client: client._id,
      car: car!._id,
      totalAmount: car.price + car.price * 0.1288,
    });
    await mailer.orderPlacement(client.firstname,client.email,car.name)
    await mailer.adminOrderVerification(car.name)
    const paymentData: PaymentBody | any = {
      ..._.pick(car, ["name", "price"]),
      orderId: order._id as string,
      clientId: client._id as string,
      clientName: client.firstname,
      clientEmail: client.email,
    };
    paymentData["price"] += paymentData["price"] * 0.1288 + 1000;
    paymentData["price"] = Math.ceil(paymentData["price"] * 100);
    const paymentService = new PaymentService(<PaymentBody>paymentData);
    const payment = await paymentService.createStripePaymentSession();
    return payment;
  }
  static async findByFilter(filter: OrderParams): Promise<object | null> {
    const query: Query = {};
    const page: number | null = filter.pages;
    const limit: number = filter.limit;
    let filterObj: any = filter;
    let excludedFields: string[] = ["page", "limit"];
    excludedFields.forEach((el) => delete filterObj[el]);
    if (filterObj.status) {
      query["status"] = filterObj.status;
    }
    const totalCount = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .sort("-createdAt")
      .populate("car", "name images")
      .populate("client", "firstname lastname");
    return {
      total_order: totalCount,
      orders: orders,
      page: page,
      pages: Math.ceil(totalCount / limit),
      limit: limit,
    };
  }
  static findById(id: ObjectId | string): Promise<object | null> {
    return Order.findById(id)
      .sort("-createdAt")
      .populate("car", "name images")
      .populate("client", "firstname lastname")
      .then((order) => order)
      .catch((error) => {
        throw new Error(error);
      });
  }
  static findAndUpdate(id: ObjectId | string, body: object): Promise<void> {
    return Order.findByIdAndUpdate(id, body)
      .then((order) => undefined)
      .catch((error) => {
        throw new Error(error);
      });
  }
  static findAndDelete(id: ObjectId | string): Promise<void> {
    return Order.findByIdAndDelete(id)
      .then((order) => undefined)
      .catch((error) => {
        throw new Error(error);
      });
  }
}
