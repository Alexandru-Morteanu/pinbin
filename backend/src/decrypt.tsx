import crypto from "crypto";
import { supabase } from "./supabase";
export default function decrypt(body: any, resolve: any, reject: any) {
  try {
    const key = Buffer.from(process.env.CRYPTO_KEY || "", "utf-8");
    const iv = Buffer.from(process.env.CRYPTO_IV || "", "utf-8");
    const fetchData = async () => {
      const res = await supabase.from("PointsTrash").select("*");
      const decryptedData = res.data?.map((row: any) => {
        const decipherX = crypto.createDecipheriv("aes-256-cbc", key, iv);
        const decipherY = crypto.createDecipheriv("aes-256-cbc", key, iv);
        let decryptedX = decipherX.update(row.x, "hex", "utf8");
        decryptedX += decipherX.final("utf8");
        let decryptedY = decipherY.update(row.y, "hex", "utf8");
        decryptedY += decipherY.final("utf8");
        return {
          points: [decryptedX, decryptedY],
          imgName: row.imgName,
          id: row.id,
        };
      });
      resolve(decryptedData);
    };
    fetchData();
  } catch {
    console.error("error");
    reject("error");
  }
}
