import mongoose, { Model, Schema, Document } from "mongoose";

enum Category {
  EXOTIC = "exotic",
  RETIRED = "retired",
  CASUAL = "casual",
}
enum Service {
  CORPORATE = "corporate",
  EVENT = "event",
  SELF = "self",
  MUSIC = "music",
  PHOTO = "photoshoot",
  ALL = "all",
}
enum DurationUnit {
  DAY = "day",
  HOUR = "hr",
  WEEK = "wk",
}
enum Transmission {
  AUTO = "automatic",
  MANUAL = "manual",
}
enum Fuel {
  GASOLINE = "gasoline",
  DEISEL = "deisel",
  KEROSENE = "kerosene",
  BATTERY = "battery",
}
export enum Status {
  ACTIVE = "active",
  BOOKED = "booked",
  RETIRED = "retired",
}
export type imageObject = { url?: string };
export interface CarDocument extends Document {
  name: string;
  category: Category;
  person: number;
  price: number;
  brand: Schema.Types.ObjectId;
  service: Service;
  duration: number;
  durationUnit: DurationUnit;
  transmision: Transmission;
  fuel: Fuel;
  status: Status;
  tripMile: number;
  images: imageObject[];
  description: string;
  availableFrom: Date;
  availableTo: Date;
  createdAt: Date;
  updatedAt: Date;
  isModified: (path?: string) => boolean;
}

const CarSchema: Schema = new Schema<CarDocument>({
  name: {
    type: String,
    required: [true, "Car name cannot be left undefined"],
  },
  category: {
    type: String,
    enum: [Category.EXOTIC, Category.CASUAL, Category.RETIRED],
    required: [true, "Car category cannot be left undefined"],
  },
  person: {
    type: Number,
    required: [true, "Number of car seaters cannot be left undefined"],
  },
  price: {
    type: Number,
    required: [true, "Price cannot be left undefined"],
  },
  service: {
    type: String,
    enum: [
      Service.ALL,
      Service.CORPORATE,
      Service.EVENT,
      Service.MUSIC,
      Service.PHOTO,
      Service.SELF,
    ],
    required: [true, "Service type required"],
  },
  duration: {
    type: Number,
    required: [true, "Duration cannot be left undefined"],
  },
  durationUnit: {
    type: String,
    enum: [DurationUnit.DAY, DurationUnit.HOUR, DurationUnit.WEEK],
    required: [true, "Duration unit cannot be left undefined"],
  },
  transmision: {
    type: String,
    enum: [Transmission.AUTO, Transmission.MANUAL],
    required: [true, "Transmission field cannot be undefined"],
  },
  fuel: {
    type: String,
    enum: [Fuel.BATTERY, Fuel.DEISEL, Fuel.GASOLINE, Fuel.KEROSENE],
    required: [true, "Fuel type is required"],
  },
  status: {
    type: String,
    enum: [Status.ACTIVE, Status.BOOKED, Status.RETIRED],
    default: Status.ACTIVE,
    required: [true, "Status of car is required"],
  },
  tripMile: {
    type: Number,
    required: [true, "Trip Mile field is required"],
  },
  images: [
    {
      url: {
        type: String,
        required: [true, "images are required"],
      },
    },
  ],
  description: {
    type: String,
    required: [true, "Product description required"],
  },
  availableFrom: {
    type: Date,
    required: true,
  },
  availableTo: {
    type: Date,
    required: true,
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
  brand: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Brand",
  },
});
const Car: Model<CarDocument> = mongoose.model<CarDocument>("Car", CarSchema);

export default Car;
