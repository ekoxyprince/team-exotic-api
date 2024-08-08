import express from "express";
import * as bodyParser from "body-parser";
import mainRoutes from "./routes/index.route";
import adminRoutes from "./routes/admin.route";
import authRoutes from "./routes/auth.route";
import logger from "morgan";
import error, { notFoundError } from "./middlewares/error.middleware";
import auth from "./middlewares/auth.middleware";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import config from "./config";

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(
  cors({
    origin: config.client_url,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type",
  })
);
app.use(logger("dev"));

app.use("/api/", mainRoutes);
app.use("/api/admin", auth, adminRoutes);
app.use("/api/auth", authRoutes);
app.use(notFoundError);
app.use(error);

export default app;
