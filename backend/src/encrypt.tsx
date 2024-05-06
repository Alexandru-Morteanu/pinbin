import crypto from "crypto";
import { supabase } from "./supabase";
export default function encrypt(body: any, resolve: any, reject: any) {
  try {
    const x1 = JSON.parse(body).x + process.env.CRYPTO_SECRET;
    const x = x1.slice(0, -1);

    const y1 = JSON.parse(body).y + process.env.CRYPTO_SECRET;
    const y = y1.slice(0, -1);

    const key = Buffer.from(process.env.CRYPTO_KEY || "", "utf-8");
    const iv = Buffer.from(process.env.CRYPTO_IV || "", "utf-8");

    const cipherX = crypto.createCipheriv("aes-256-cbc", key, iv);
    const cipherY = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encryptedX = cipherX.update(x, "utf8", "hex");
    encryptedX += cipherX.final("hex");
    let encryptedY = cipherY.update(y, "utf8", "hex");
    encryptedY += cipherY.final("hex");
    const insertEncyption = async () => {
      console.log(JSON.parse(body).imgName);
      const data = {
        x: encryptedX,
        y: encryptedY,
        imgName: JSON.parse(body).imgName,
        status: "Problem",
      };
      await supabase.from("PointsTrash").insert([data]);
    };
    insertEncyption();
    resolve(encryptedX);
  } catch {
    console.error("error");
    reject("error");
  }
}
