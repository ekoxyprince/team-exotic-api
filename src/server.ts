import app from "./app";
import http from "http";
import config from "./config";
import connectToDb from "./database";
import User from "./database/models/user.model";

const server = http.createServer(app);

connectToDb(config.db_url!)
  .then((connected) => {
    server.listen(config.port, () => {
      console.log(`Listening on port ${config.port}`);
    });
    return User.findOne();
  })
  .then((user) => {
    if (!user) {
      return User.create({
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
