import express from "express";
import fs from "fs";
import certificateRouter from "./routes/generate.js";
import verifyToken from "./routes/verifyToken.js";
import validateRouter from "./routes/validate.js";
import retriveRouter from "./routes/retrive.js";

import https from "https";
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

// Load SSL certificate and key
const privateKey = fs.readFileSync(
  "/Users/morteanualexandru/Desktop/pinbin/digital/cert/key.pem",
  "utf8"
);
const certificate = fs.readFileSync(
  "/Users/morteanualexandru/Desktop/pinbin/digital/cert/cert.pem",
  "utf8"
);

// Create HTTPS server
const server = https.createServer(
  {
    key: privateKey,
    cert: certificate,
  },
  app
);

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// key: fs.readFileSync(
//     "/Users/morteanualexandru/Desktop/pinbin/digital/cert/key.pem"
//   ),
//   cert: fs.readFileSync(
//     "/Users/morteanualexandru/Desktop/pinbin/digital/cert/cert.pem"
//   ),
