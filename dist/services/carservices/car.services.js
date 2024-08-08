"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const car_model_1 = __importDefault(require("../../database/models/car.model"));
const config_1 = __importDefault(require("../../config"));
class CarService {
    constructor(body, files) {
        this.body = body;
        this.files = files;
        this.body = body;
        this.files = files;
    }
    create() {
        const imageArr = [];
        this.files.forEach((file) => {
            let imageObj = {};
            imageObj["url"] =
                config_1.default.server_url + `${file.destination}${file.filename}`.slice(config_1.default.split_val);
            imageArr.push(imageObj);
        });
        return car_model_1.default.create(Object.assign(Object.assign({}, this.body), { images: imageArr, availableFrom: new Date(this.body.availableFrom), availableTo: new Date(this.body.availableTo) }))
            .then((createdCar) => {
            return;
        })
            .catch((error) => {
            throw new Error(error);
        });
    }
    update(id) {
        console.log(this.body);
        return car_model_1.default.findByIdAndUpdate(id, this.body)
            .then((updatedCar) => {
            return;
        })
            .catch((error) => {
            throw new Error(error);
        });
    }
    static findAll(filter) {
        return car_model_1.default.find(filter)
            .sort("-createdAt")
            .populate("brand", "name")
            .then((cars) => cars)
            .catch((error) => {
            throw new Error(error);
        });
    }
    static findById(id) {
        return car_model_1.default.findById(id)
            .sort("-createdAt")
            .then((car) => car)
            .catch((error) => {
            throw new Error(error);
        });
    }
    static findByFilter(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {};
            const page = filter.pages;
            const limit = filter.limit;
            let filterObj = filter;
            let excludedFields = ["page", "limit"];
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
            if (filterObj.category) {
                query["category"] = filterObj.category;
            }
            const totalCount = yield car_model_1.default.countDocuments(query);
            const cars = yield car_model_1.default.find(query).sort("-createdAt").populate("brand", "name image").limit(limit).skip((page - 1) * limit);
            return {
                total_cars: totalCount,
                cars: cars,
                page: page,
                pages: Math.ceil(totalCount / limit),
                limit: limit
            };
        });
    }
    static delete(id) {
        return car_model_1.default.findByIdAndDelete(id)
            .then((deletedCar) => {
            void deletedCar;
        })
            .catch((error) => {
            console.log(error);
        });
    }
    static findWithPagination(params) {
        return car_model_1.default.find({ status: "active" })
            .sort("-createdAt")
            .skip(params.pages * params.limit)
            .limit(params.limit)
            .populate("brand", "name image")
            .then((cars) => cars)
            .catch((error) => {
            throw new Error(error);
        });
    }
    static findOtherCarsExcept(query) {
        return car_model_1.default.find({ _id: { $ne: query.id } })
            .sort("-createdAt")
            .limit(6)
            .populate("brand", "name image")
            .then((cars) => cars)
            .catch((error) => {
            throw new Error(error);
        });
    }
}
exports.default = CarService;
