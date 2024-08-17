import { createTransport } from "nodemailer";
import config from "../config";
import template from "./template";
import { BadRequestError } from "../exceptions/error";

async function mail(html: string, subject: string, email?: string | undefined) {
  const transporter = createTransport({
    auth: {
      user: config.email,
      pass: config.email_pass,
    },
    port: 465,
    secure: true,
    host: config.email_host,
    tls: {
      rejectUnauthorized: true,
    },
  });
  const mailer = await transporter.sendMail({
    from: `"Team Exotic rentals" <${config.email}>`,
    to: email || config.email,
    subject: subject,
    text: "Hello",
    html,
  });
  return mailer;
}
class Mailer {
  registration = (name: string, email: string) => {
    const msg = template.message(
      name,
      "You have successfully registered on team exotic rentals Kindly wait while we verify your documents",
      "Account Registration"
    );
    return mail(msg, "Account Registration", email)
      .then((msg) => msg)
      .catch((error) => {
        throw new BadRequestError(error);
      });
  };
  adminVerification = () => {
    const msg = template.message(
      "Admin",
      `A new user has registered kindly verify the provided documents`,
      "User Registration"
    );
    return mail(msg, "Account Registation")
      .then((msg) => msg)
      .catch((error) => {
        throw new BadRequestError(error);
      });
  };
  userVerification = (name: string, email: string) => {
    const msg = template.message(
      name,
      "Provided details have been verified and you can now proceed with your order",
      "Account Verification"
    );
    return mail(msg, "Account Verification", email)
      .then((msg) => msg)
      .catch((error) => {
        throw new BadRequestError(error);
      });
  };
  orderPlacement = (name: string, email: string, car: string) => {
    const msg = template.message(
      name,
      `You made a request to book one of our rides: ${car}. we await your payment.`,
      "Ride Booked"
    );
    return mail(msg, "Ride Booked", email)
      .then((msg) => msg)
      .catch((error) => {
        throw new BadRequestError(error);
      });
  };
  adminOrderVerification = (car: string) => {
    const msg = template.message(
      "Admin",
      `A user just booked ${car} kindly go online to validate this order`,
      "Order Booked"
    );
    return mail(msg, "Ride Booked")
      .then((msg) => msg)
      .catch((error) => {
        throw new BadRequestError(error);
      });
  };
  userPayment = (car: string, name: string, email: string, status: string) => {
    const msg = template.message(
      name,
      `Your payment status for ${car} is ${status}.`,
      "Payment notification"
    );
    return mail(msg, "Payment notification", email)
      .then((msg) => msg)
      .catch((error) => {
        throw new BadRequestError(error);
      });
  };
  adminUserPayment = (car: string, status: string) => {
    const msg = template.message(
      "Admin",
      `The payment status for ${car} is ${status}`,
      `Payment notification`
    );
    return mail(msg, `Payment notification`)
      .then((msg) => msg)
      .catch((error) => {
        throw new BadRequestError(error);
      });
  };
}

export default new Mailer();
