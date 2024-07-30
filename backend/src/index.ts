import { Elysia, t } from "elysia";
import { logger } from "@bogeychan/elysia-logger";
import { cors } from "@elysiajs/cors";
import python from "./python";
import encrypt from "./encrypt";
import decrypt from "./decrypt";

const app = new Elysia();
app.use(cors());
app.use(logger({ level: "error" }));

// tensorflow
app.post("/", ({ body }: any) => {
  return new Promise((resolve, reject) => {
    python(body, resolve, reject);
  });
});

app.onParse(({ request }, contentType) => {
  if (contentType === "application/json") return request.text();
});

// encryption
app.post("/encrypt", ({ body }: any) => {
  return new Promise((resolve, reject) => {
    encrypt(body, resolve, reject);
  });
});

// decryption
app.post("/decrypt", ({ body }: any) => {
  return new Promise((resolve, reject) => {
    decrypt(body, resolve, reject);
  });
});

const port: number = parseInt(process.env.PORT as string, 10) || 8000;
app.listen(port);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
