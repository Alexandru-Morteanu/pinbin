import express from "express";
import { createClient } from "@supabase/supabase-js";
import forge from "node-forge";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mdmhnYnJheXdkc3hjZnBmbHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAyMjM4NzcsImV4cCI6MjAxNTc5OTg3N30.2Z7-PEOJWSphoxmQb2Q_M2q9UxUaS3Y-KAuxkIKbvw4";
const SUPABASE_URL = "https://ofvhgbraywdsxcfpflvv.supabase.co";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const app = express.Router();

app.get("/retrive", async (req, res) => {
  try {
    const { data, error } = await supabase.from("Contracts").select("*");

    const contractsInfo = data.map((contractData) => {
      try {
        const cert = forge.pki.certificateFromPem(contractData.contract);
        const commonName = cert.subject.getField("CN").value;
        const organization = cert.subject.getField("O").value;
        const id = contractData.id;
        return { id, commonName, organization };
      } catch (error) {
        console.error("Error parsing certificate:", error);
        return { id: null, error };
      }
    });

    res.json({ contracts: contractsInfo });
  } catch (error) {
    console.log(error);
  }
});
export default app;
