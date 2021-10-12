const express = require("express");
const app = express();
const server = require("http").Server(app);
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
require("dotenv").config({ path: "./config.env" });
const connectDB = require("./utils/server/connectDB");
const port = process.env.PORT || 3000;
app.use(express.json());
connectDB();

nextApp.prepare().then(() => {
  app.use("/api/auth", require("./api/auth"));
  app.use("/api/signup", require("./api/signup"));

  app.all("*", (req, res) => handle(req, res));

  server.listen(port, (error) => {
    if (error) throw error;

    console.log("Express server running on port", port);
  });
});
