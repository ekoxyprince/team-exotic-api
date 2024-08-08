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
      console.log(`Server running on ${config.server_url}`);
      console.log(`Client server is on ${config.client_url}`)
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
