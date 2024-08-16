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
const client_model_1 = __importDefault(require("../../database/models/client.model"));
const error_1 = require("../../exceptions/error");
const config_1 = __importDefault(require("../../config"));
const mail_1 = __importDefault(require("../../helpers/mail"));
class ClientService {
    constructor(body, files) {
        this.body = body;
        this.files = files;
        this.body = body;
        this.files = files;
    }
    create() {
        return client_model_1.default.create(Object.assign(Object.assign({}, this.body), { insuranceImage: `${this.files[1].destination}${this.files[0].filename}`.slice(8), licenseImage: `${this.files[0].destination}${this.files[1].filename}`.slice(8) }))
            .then((client) => {
            return client;
        })
            .catch((error) => {
            throw new Error(error);
        });
    }
    static findClient(driverLicenseNumber) {
        return client_model_1.default.findOne({ driverLicenseNumber }).then(client => {
            if (!client)
                throw new error_1.BadRequestError("Client not found!");
            return client;
        }).catch(error => { throw new error_1.BadRequestError(error); });
    }
    findOrCreateClient() {
        return client_model_1.default.findOne({ email: this.body.email }).then(client => {
            if (!client) {
                return client_model_1.default.create(Object.assign(Object.assign({}, this.body), { insuranceImage: config_1.default.server_url + `${this.files[0].destination}${this.files[0].filename}`.slice(config_1.default.split_val), licenseImage: config_1.default.server_url + `${this.files[1].destination}${this.files[1].filename}`.slice(config_1.default.split_val) }));
            }
            return client;
        })
            .then(createdOrExistingClient => {
            return createdOrExistingClient;
        })
            .catch(error => {
            if (error instanceof error_1.BadRequestError) {
                throw new error_1.BadRequestError(error.message);
            }
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
                query["firstname"] = { $regex: new RegExp(filterObj.q), $options: "i" };
            }
            if (filterObj.status) {
                query["status"] = filterObj.status;
            }
            const totalCount = yield client_model_1.default.countDocuments(query);
            const clients = yield client_model_1.default.find(query).sort("-createdAt");
            return {
                total_client: totalCount,
                clients: clients,
                page: page,
                pages: Math.ceil(totalCount / limit),
                limit: limit
            };
        });
    }
    static findById(id) {
        return client_model_1.default.findById(id)
            .sort("-createdAt")
            .then((client) => client)
            .catch((error) => {
            throw new Error(error);
        });
    }
    static findAndUpdate(id) {
        return client_model_1.default.findByIdAndUpdate(id, { status: "verified" })
            .then((client) => {
            mail_1.default.userVerification(client === null || client === void 0 ? void 0 : client.firstname, client === null || client === void 0 ? void 0 : client.email);
        })
            .catch((error) => {
            throw new Error(error);
        });
    }
}
exports.default = ClientService;
