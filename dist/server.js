"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
const config_1 = __importDefault(require("./config"));
const database_1 = __importDefault(require("./database"));
const user_model_1 = __importDefault(require("./database/models/user.model"));
const server = http_1.default.createServer(app_1.default);
(0, database_1.default)(config_1.default.db_url)
    .then((connected) => {
    server.listen(config_1.default.port, () => {
        console.log(`Listening on port ${config_1.default.port}`);
    });
    return user_model_1.default.findOne();
})
    .then((user) => {
    if (!user) {
        return user_model_1.default.create({
            username: "Admin",
            email: "admin@admin.com",
            password: "developer",
        });
    }
    return user;
})
    .then((user) => {
    console.log("Admin created or exists");
});
