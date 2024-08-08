import mongoose, { Document, Schema, Model } from "mongoose";

export interface BrandDocument extends Document {
  name: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const BrandSchema: Schema = new Schema<BrandDocument>({
  name: {
    type: String,
    required: [true, "Brand name is required"],
  },
  image: {
    type: String,
    required: [true, "image is required"],
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
});
const Brand: Model<BrandDocument> = mongoose.model<BrandDocument>(
  "Brand",
  BrandSchema
);

export default Brand;
