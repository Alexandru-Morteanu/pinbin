import express from "express";
import { createClient } from "@supabase/supabase-js";
import forge from "node-forge";
import jwt from "jsonwebtoken";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mdmhnYnJheXdkc3hjZnBmbHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAyMjM4NzcsImV4cCI6MjAxNTc5OTg3N30.2Z7-PEOJWSphoxmQb2Q_M2q9UxUaS3Y-KAuxkIKbvw4";
const SUPABASE_URL = "https://ofvhgbraywdsxcfpflvv.supabase.co";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const app = express.Router();

app.post("/verifyToken", async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jwt.decode(token);

    const { data, error } = await supabase
      .from("Contracts")
      .select("contract")
      .eq("id", decoded.id);
    const cert = forge.pki.certificateFromPem(data[0].contract);
    console.log(cert.subject.getField("CN").value);
    console.log(cert.subject.getField("O").value);
    const respone = {
      nume: cert.subject.getField("CN").value,
      organizatie: cert.subject.getField("O").value,
    };
    res.json(respone);
  } catch (error) {
    console.log(error);
  }
});
export default app;
