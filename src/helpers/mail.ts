import { createTransport } from "nodemailer";
import config from "../config";
import template from "./template";

async function mail(html: string, subject: string, email?: string | undefined) {
  const transporter = createTransport({
    auth: {
      user: config.email,
      pass: config.email_pass,
    },
    port:465,
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
    return mail(msg, "Account Registration", email);
  };
  adminVerification = () => {
    const msg = template.message(
      "Admin",
      `A new user has registered kindly verify the provided documents`,
      "User Registration"
    );
    return mail(msg, "Account Registation");
  };
  userVerification = (name: string, email: string) => {
    const msg = template.message(
      name,
      "Provided details have been verified and you can now proceed with your order",
      "Account Verification"
    );
    return mail(msg, "Account Verification", email);
  };
  orderPlacement = (name: string, email: string, car: string) => {
    const msg = template.message(
      name,
      `You made a request to book one of our rides: ${car}. we await your payment.`,
      "Ride Booked"
    );
    return mail(msg, "Ride Booked", email);
  };
  adminOrderVerification = (car: string) => {
    const msg = template.message(
      "Admin",
      `A user just booked ${car} kindly go online to validate this order`,
      "Order Booked"
    );
    return mail(msg, "Ride Booked");
  };
  userPayment = (car: string, name: string, email: string, status: string) => {
    const msg = template.message(
      name,
      `Your payment status for ${car} is ${status}.`,
      "Payment notification"
    );
    return mail(msg, "Payment notification", email);
  };
  adminUserPayment = (car: string, status: string) => {
    const msg = template.message(
      "Admin",
      `The payment status for ${car} is ${status}`,
      `Payment notification`
    );
    return mail(msg, `Payment notification`);
  };
}

export default new Mailer();
