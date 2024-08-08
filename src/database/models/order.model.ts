import mongoose, { Model, Document, Schema, ObjectId } from "mongoose";

export enum PaymentStatus {
  COMPLETED = "completed",
  FAILED = "failed",
  REFUNDED = "refunded",
  PENDING = "pending",
}
export enum OrderStatus {
  BOOKED = "booked",
  LIVE = "live",
  COMPLETED = "completed",
  CANCELED = "canceled",
}

export interface OrderDocument extends Document {
  pickupDate: string;
  pickupTime: string;
  pickupLocation: string;
  returnLocation: string;
  email: string;
  returnDate: string;
  returnTime: string;
  totalAmount: number;
  car: ObjectId;
  client: ObjectId;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  createdAt:Date,
  updatedAt:Date,
}
const OrderSchema: Schema = new Schema<OrderDocument>({
  pickupDate: {
    type: String,
    required: [true, "Pickup Date is not Provided"],
  },
  pickupTime: {
    type: String,
    required: [true, "Pickup Time is required"],
  },
  pickupLocation: {
    type: String,
    required: [true, "Pickup Location is required"],
  },
  returnDate: {
    type: String,
    required: [true, "Return Date is required"],
  },
  returnTime: {
    type: String,
    required: [true, "Return Time is required"],
  },
  returnLocation: {
    type: String,
    required: [true, "Return Location is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  totalAmount: {
    type: Number,
    required: [true, "Amount is required"],
  },
  client: {
    type: mongoose.Types.ObjectId,
    required: [true, "Client Id required"],
    ref: "Client",
  },
  car: {
    type: mongoose.Types.ObjectId,
    required: [true, "Car Id is required"],
    ref: "Car",
  },
  orderStatus: {
    type: String,
    enum: [
      OrderStatus.BOOKED,
      OrderStatus.CANCELED,
      OrderStatus.COMPLETED,
      OrderStatus.LIVE,
    ],
    required: [true, "Order Status is required"],
    default:OrderStatus.LIVE
  },
  paymentStatus: {
    type: String,
    required: [true, "Payment Status is required"],
    enum: [
      PaymentStatus.COMPLETED,
      PaymentStatus.FAILED,
      PaymentStatus.PENDING,
      PaymentStatus.REFUNDED,
    ],
    default:PaymentStatus.PENDING
  },
  createdAt:{
    type:Date,
    required:true,
    default:new Date(Date.now())
  },
  updatedAt:{
    type:Date,
    required:true,
    default:new Date(Date.now())
  }
});

const Order: Model<OrderDocument> = mongoose.model<OrderDocument>(
  "Order",
  OrderSchema
);

export default Order;
