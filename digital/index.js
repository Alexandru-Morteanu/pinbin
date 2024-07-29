import express from "express";
import fs from "fs";
import certificateRouter from "./routes/generate.js";
import verifyToken from "./routes/verifyToken.js";
import validateRouter from "./routes/validate.js";
import retriveRouter from "./routes/retrive.js";
import dotenv from "dotenv";
dotenv.config();

import http from "http";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: "*", // Replace with your allowed origin
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

// Middleware to log requests
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});

// Mount the certificate generation router
app.use("/api", certificateRouter);
app.use("/api", validateRouter);
app.use("/api", retriveRouter);
app.use("/api", verifyToken);

// Create HTTP server
const server = http.createServer(app);

// Start the server
const PORT = parseInt(process.env.PORT, 10) || 8080;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
