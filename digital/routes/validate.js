import express from "express";
import { createClient } from "@supabase/supabase-js";
import forge from "node-forge";
import jwt from "jsonwebtoken";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mdmhnYnJheXdkc3hjZnBmbHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAyMjM4NzcsImV4cCI6MjAxNTc5OTg3N30.2Z7-PEOJWSphoxmQb2Q_M2q9UxUaS3Y-KAuxkIKbvw4";
const SUPABASE_URL = "https://ofvhgbraywdsxcfpflvv.supabase.co";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const app = express.Router();

app.post("/validate", async (req, res) => {
  const { certificate, privateKey } = req.body.data;
  try {
    const { data, error } = await supabase
      .from("Contracts")
      .select("contract")
      .eq("id", certificate);
    const transformedCertificate = data[0].contract.replace(/\n/g, "\r\n");
    const transformedPrivateKey = privateKey.replace(/\n/g, "\r\n");

    const isValid = await privateKeyMatchesCertificate(
      transformedPrivateKey,
      transformedCertificate
    );

    if (isValid) {
      const cert = forge.pki.certificateFromPem(data[0].contract);
      const user = {
        id: certificate,
        username: cert.subject.getField("CN").value,
      };
      console.log(user);
      const token = jwt.sign(user, "secretSUPERsecret", { expiresIn: "30d" });

      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Invalid certificate or private key" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

async function privateKeyMatchesCertificate(privateKeyPem, certificatePem) {
  try {
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
    const certificate = forge.pki.certificateFromPem(certificatePem);
    const isMatch =
      certificate.publicKey.n.toString(16) === privateKey.n.toString(16);
    console.log(isMatch);
    return isMatch;
  } catch (error) {
    console.error("Error validating private key and certificate:", error);
    return false;
  }
}
export default app;
