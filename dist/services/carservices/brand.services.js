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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const brand_model_1 = __importDefault(require("../../database/models/brand.model"));
const config_1 = __importDefault(require("../../config"));
class BrandServices {
    constructor(body, file) {
        this.body = body;
        this.file = file;
        this.saveBrand = () => __awaiter(this, void 0, void 0, function* () {
            const brand = yield brand_model_1.default.create({
                name: this.body['name'],
                image: config_1.default.server_url + `${this.file.destination}${this.file.filename}`.slice(config_1.default.split_val)
            });
        });
        this.updateBrand = (id) => __awaiter(this, void 0, void 0, function* () {
            const updatedBrand = yield brand_model_1.default.findOneAndUpdate({ _id: id }, {
                name: this.body['name'],
                image: config_1.default.server_url + `${this.file.destination}${this.file.filename}`.slice(config_1.default.split_val)
            });
        });
        this.body = body;
        this.file = file;
    }
}
_a = BrandServices;
BrandServices.findAllBrands = () => __awaiter(void 0, void 0, void 0, function* () {
    const fetchedBrands = yield brand_model_1.default.find();
    return fetchedBrands;
});
BrandServices.findSingleBrand = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const singleBrand = yield brand_model_1.default.findById(id);
    return singleBrand;
});
BrandServices.deleteBrand = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteBrand = yield brand_model_1.default.findByIdAndDelete(id);
});
exports.default = BrandServices;
