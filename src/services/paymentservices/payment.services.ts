import Stripe from "stripe";
import config from "../../config";
const stripe = new Stripe(config.stripe_sk!);
import { AuthorizationError } from "../../exceptions/error";
import Payment, { PaymentDocument } from "../../database/models/payment.model";
import Client from "../../database/models/client.model";
import Order, {
  OrderStatus,
  PaymentStatus,
} from "../../database/models/order.model";
import Car, { Status } from "../../database/models/car.model";
import { ObjectId } from "mongoose";
import mailer from "../../helpers/mail";

export interface PaymentBody {
  name: string;
  price: number;
  clientId: string;
  orderId: string;
  clientName?: string;
  clientEmail?: string;
}
export interface PaymentParams {
  limit: number;
  pages: number | null;
  q?: string | null;
}
interface Query {
  clientName?: object;
}

class PaymentService {
  constructor(readonly body: PaymentBody) {
    this.body = body;
  }
  private createCustomer() {
    return stripe.customers.create({
      name: this.body.clientName,
      email: this.body.clientEmail,
      metadata: {
        id: this.body.clientId,
      },
    });
  }
  createStripePaymentSession() {
    console.log(this.body);
    return stripe.checkout.sessions
      .create({
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: this.body.name,
              },
              unit_amount: this.body.price,
            },
            quantity: 1,
          },
        ],
        customer_email: this.body.clientEmail,
        client_reference_id: this.body.orderId.toString(),
        mode: "payment",
        success_url: `${config.server_url}/api/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${config.server_url}/api/payment/cancel?session_id={CHECKOUT_SESSION_ID}`,
      })
      .then((session) => session)
      .catch((error) => {
        throw new Error(error);
      });
  }
  static verifyStripePaymentSession(session_id: string) {
    return stripe.checkout.sessions
      .retrieve(session_id)
      .then((session) => {
        if (!session) throw new AuthorizationError("No session found");
        return session;
      })
      .catch((error) => {
        if (error instanceof AuthorizationError) {
          throw new AuthorizationError(error.message);
        }
      });
  }
  static createUserPayment = async (id: string): Promise<object> => {
    try {
      const paymentSession = (await this.verifyStripePaymentSession(
        id
      )) as Stripe.Response<Stripe.Checkout.Session>;
      if (!paymentSession) throw new Error("Invalid payment session");
      const client = await Client.findOne({
        email: paymentSession.customer_email,
      });
      if (!client) throw new Error("Invalid payment session");
      const payment = await Payment.create<PaymentDocument | any>({
        session_id: paymentSession.id,
        clientName: `${client.firstname} ${client.lastname}`,
        order: paymentSession.client_reference_id,
        status: paymentSession.payment_status,
        amount: paymentSession.amount_total,
      });
      const order = await Order.findById(payment.order);
      order!["paymentStatus"] =
        paymentSession.payment_status == "paid"
          ? PaymentStatus.COMPLETED
          : PaymentStatus.PENDING;
      order!["orderStatus"] =
        paymentSession.payment_status == "paid"
          ? OrderStatus.BOOKED
          : OrderStatus.LIVE;
      await order?.save();
      const car = await Car.findById(order?.car);
      car!["status"] =
        paymentSession.payment_status == "paid" ? Status.BOOKED : Status.ACTIVE;
      await car?.save();
      await mailer.userPayment(car?.name!,client.firstname,client.email,paymentSession.payment_status)
      await mailer.adminUserPayment(car?.name!,paymentSession.payment_status)
      return { status: paymentSession.payment_status };
    } catch (error) {
      const err = <Error>error;
      throw new Error(err.message);
    }
  };
  static fetchAllPayments = async (
    filter: PaymentParams
  ): Promise<PaymentDocument[]> => {
    try {
      const query: Query = {};
      let filterObj: any = filter;
      let excludedFields: string[] = ["page", "limit"];
      excludedFields.forEach((el) => delete filterObj[el]);
      if (filterObj.q) {
        query["clientName"] = {
          $regex: new RegExp(filterObj.q),
          $options: "i",
        };
      }
      const payments = await Payment.find(query).sort("-createdAt");
      return payments;
    } catch (error) {
      const err = <Error>error;
      throw new Error(err.message);
    }
  };
  static deletePayment = (id: string | ObjectId): Promise<void> => {
    return Payment.findByIdAndDelete(id)
      .then((payment) => void payment)
      .catch((error) => {
        throw new Error(error);
      });
  };
}
export default PaymentService;
