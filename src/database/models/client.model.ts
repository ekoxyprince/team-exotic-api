import mongoose, { Model, Schema, Document } from "mongoose";
import { beforeSave } from "../hooks/client.hook";

enum Status {
  VERIFIED = "verified",
  UNVERIFIED = "unverified",
  RESTRICTED = "restricted",
}

export interface ClientDocument extends Document {
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  insuranceCompany: string;
  insurancePolicyNumber: number;
  dateOfBirth: Date;
  driverLicenseNumber: number;
  insuranceImage: string;
  licenseImage: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}
const ClientSchema: Schema = new Schema<ClientDocument>({
  firstname: {
    type: String,
    required: [true, "Client firstname is required"],
    unique:true
  },
  lastname: {
    type: String,
    required: [true, "Client lastname is required"],
    unique:true
  },
  middlename: {
    type: String,
    required: [true, "Client middlename is required"],
    unique:true
  },
  email: {
    type: String,
    required: [true, "Client Email is required"],
    unique:true
  },
  phone: {
    type: String,
    required: [true, "Client Mobile number is required"],
  },
  city: {
    type: String,
    required: [true, "Client city is required"],
  },
  state: {
    type: String,
    required: [true, "Client state is required"],
  },
  zipcode: {
    type: String,
    required: [true, "Client zipcode is required"],
  },
  country: {
    type: String,
    required: [true, "Client country is required"],
  },
  insuranceCompany: {
    type: String,
    required: [true, "Client insurance company is required"],
  },
  insurancePolicyNumber: {
    type: Number,
    required: [true, "Client policy company is required"],
    unique:true
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Client Birth date is required"],
  },
  driverLicenseNumber: {
    type: Number,
    required: [true, "Client License number is required"],
    unique:true
  },
  insuranceImage: {
    type: String,
    required: [true, "Insurance Image is required"],
  },
  licenseImage: {
    type: String,
    required: [true, "License Image is required"],
  },
  status: {
    type: String,
    required: [true, "status is required"],
    enum: [Status.RESTRICTED, Status.UNVERIFIED, Status.VERIFIED],
    default:Status.UNVERIFIED
  },
  createdAt: {
    type: Date,
    required: [true, "Created At missing"],
    default: new Date(Date.now()),
  },
  updatedAt: {
    type: Date,
    required: [true, "Updated At missing"],
    default: new Date(Date.now()),
  },
});
ClientSchema.pre<ClientDocument>("save", async function (next) {
  await beforeSave.call(this, next);
});
const Client: Model<ClientDocument> = mongoose.model<ClientDocument>(
  "Client",
  ClientSchema
);

export default Client
