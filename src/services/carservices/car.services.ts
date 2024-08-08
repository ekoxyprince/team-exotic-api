import { ObjectId } from "mongoose";
import Car from "../../database/models/car.model";
import { CarDocument, imageObject } from "../../database/models/car.model";
import config from "../../config";

export interface Params {
  limit: number;
  pages: number | null;
  service?: string | null;
  brand?: ObjectId | null;
  q?: string | null;
  category?:string
}
interface Query {
  name?: object;
  service?: string;
  brand?: ObjectId;
  category?:string
}

export default class CarService {
  constructor(
    readonly body: CarDocument,
    private files?: Express.Multer.File[]
  ) {
    this.body = body;
    this.files = files;
  }
  create(): Promise<void> {
    const imageArr: imageObject[] = [];
    this.files!.forEach((file) => {
      let imageObj: imageObject = {};
      imageObj["url"] =
        config.server_url + `${file.destination}${file.filename}`.slice(config.split_val);
      imageArr.push(imageObj);
    });
    return Car.create({
      ...this.body,
      images: imageArr,
      availableFrom: new Date(this.body.availableFrom),
      availableTo: new Date(this.body.availableTo),
    })
      .then((createdCar) => {
        return
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  update(id: ObjectId | string): Promise<void> {
    console.log(this.body);
    return Car.findByIdAndUpdate(id, this.body)
      .then((updatedCar) => {
        return ;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  static findAll(filter?: object | null): Promise<object[]> {
    return Car.find(filter!)
      .sort("-createdAt")
      .populate("brand", "name")
      .then((cars) => cars)
      .catch((error) => {
        throw new Error(error);
      });
  }
  static findById(id: ObjectId | string): Promise<object | null> {
    return Car.findById(id)
      .sort("-createdAt")
      .then((car) => car)
      .catch((error) => {
        throw new Error(error);
      });
  }
  static async findByFilter(filter: Params): Promise<object | null> {
    const query: Query = {};
    const page: number | null = filter.pages;
    const limit: number = filter.limit;
    let filterObj: any = filter;
    let excludedFields: string[] = ["page", "limit"];
    excludedFields.forEach((el) => delete filterObj[el]);
    if (filterObj.q) {
      query["name"] = { $regex: new RegExp(filterObj.q), $options: "i" };
    }
    if (filterObj.service) {
      query["service"] = filterObj.service;
    }
    if (filterObj.brand) {
      query["brand"] = filterObj.brand;
    }
    if(filterObj.category){
      query["category"] = filterObj.category;
    }
    const totalCount = await Car.countDocuments(query);
    const cars = await Car.find(query).sort("-createdAt").populate("brand","name image").limit(limit).skip((page!-1)*limit);
    return {
      total_cars: totalCount,
      cars: cars,
      page:page,
      pages:Math.ceil(totalCount/limit),
      limit:limit
    };
  }
  static delete(id: ObjectId | string): Promise<void> {
    return Car.findByIdAndDelete(id)
      .then((deletedCar) => {
        void deletedCar;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  static findWithPagination(params: Params): Promise<object | null> {
    return Car.find({ status: "active" })
      .sort("-createdAt")
      .skip(params.pages! * params.limit)
      .limit(params.limit)
      .populate("brand", "name image")
      .then((cars) => cars)
      .catch((error) => {
        throw new Error(error);
      });
  }
  static findOtherCarsExcept(query: { id?: ObjectId }) {
    return Car.find({ _id: { $ne: query.id } })
      .sort("-createdAt")
      .limit(6)
      .populate("brand", "name image")
      .then((cars) => cars)
      .catch((error) => {
        throw new Error(error);
      });
  }
}
