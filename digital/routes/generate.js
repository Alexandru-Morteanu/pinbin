// routes/certificate.js

import express from "express";
import forge from "node-forge";

const router = express.Router();

router.post("/generate", (req, res) => {
  try {
    const keys = forge.pki.rsa.generateKeyPair(2048);

    // Create a new certificate
    const cert = forge.pki.createCertificate();
    cert.publicKey = keys.publicKey;
    cert.serialNumber = "01";
    cert.validity.notBefore = new Date();
    cert.validity.notAfter = new Date();
    cert.validity.notAfter.setFullYear(
      cert.validity.notBefore.getFullYear() + 1
    );

    // Set certificate subject and issuer
    const attrs = [
      {
        name: "commonName",
        value: "Caojocaru Daniel",
      },
      {
        name: "organizationName",
        value: "ISJ Braila",
      },
    ];
    cert.setSubject(attrs);
    cert.setIssuer(attrs);

    // Sign the certificate with the private key
    cert.sign(keys.privateKey);

    // Convert certificate to PEM format
    const pemCertificate = forge.pki.certificateToPem(cert);
    const pemPrivateKey = forge.pki.privateKeyToPem(keys.privateKey);

    // Respond with the generated certificate (in PEM format) and private key
    res.json({
      certificate: pemCertificate,
      privateKey: pemPrivateKey,
    });
  } catch (error) {
    console.error("Error generating certificate:", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the certificate." });
  }
});

export default router;
