"use client";
import React from "react";
import axiosInstance from "../components/axios";
import axios, { AxiosRequestConfig } from "axios";

type Props = {};

export default function page({}: Props) {
  function downloadCertificate() {
    const certificatePem =
      "-----BEGIN CERTIFICATE-----\r\nMIICtTCCAZ2gAwIBAgIBATANBgkqhkiG9w0BAQUFADAeMRwwGgYDVQQDExNFeGFt\r\ncGxlIENlcnRpZmljYXRlMB4XDTI0MDQxNjEyMTg1MloXDTI1MDQxNjEyMTg1Mlow\r\nHjEcMBoGA1UEAxMTRXhhbXBsZSBDZXJ0aWZpY2F0ZTCCASIwDQYJKoZIhvcNAQEB\r\nBQADggEPADCCAQoCggEBAL8WhKeYh+U/Dhh12u9Q8q/JhPrs/jgcmAFum38h0J3r\r\ntjmbfGKiwk58w8/bvhC74EUo5EZLi0rA8f4bSIcAry2x1yuvgl7Zq+OUkj5UFGWo\r\nnAXibKJTbjw5F9Vu+/X0ODV+ORoy5Ol2CtgEjJAYRzETzkwQdL+eiPz+V5mxSU1r\r\nBsPRPwrV/jR9Z8Io6RYRmPOg5lJnh5q6OiKMTTdg79EbrLhPIyx/I5bld5LzilYY\r\nfe+Dn59ZOu/sZNk56F62y9gihPfdr/wyJakmeb+3HbNpbsxKHhd/LTXZ/YKEEEEl\r\nCC78JMvpChCpnkM88MuRWgoFeVl6x1Bhb2XP2PtJpRsCAwEAATANBgkqhkiG9w0B\r\nAQUFAAOCAQEAQAvPFFiU+AzhcgLbbx1L1/558I+tW80um8lb2IP3Bxg/1ZujkwHA\r\n6HbJB0pAIUiyaQ4sIjtSs7sQhRFsfuHyocZsckrfHBG8MPRdeAXmEYGzCYv9PA+B\r\no6aCi3uTTjO6qmYqbaccbXICviZSVQ+1DYqvrjYdX5O0oYeMIJvmC0YCGh0Keoyk\r\ne0w9xu7YX37tyTgbQDCk/W5ZK/otFF5a1xcgYkjoeAY3R6/hHWFMpVGFGgHIWOY6\r\nlphDxP1tTHZoL1YrQ/4G8M90/7yBd8ETdl/VLqJ798ngukyDSDqAeqRkeE4rS38a\r\nFBo0ja5PMZ66ALA7tDoeKVkwkvCDzoS45w==\r\n-----END CERTIFICATE-----\r\n";
    const certificateBlob = new Blob([certificatePem], {
      type: "application/x-x509-ca-cert",
    });
    const certificateUrl = URL.createObjectURL(certificateBlob);

    const certificateLink = document.createElement("a");
    certificateLink.href = certificateUrl;
    certificateLink.download = "certificate.pem";
    certificateLink.click();
  }
  function downloadPrivateKey() {
    const certificatePem =
      "-----BEGIN RSA PRIVATE KEY-----\r\nMIIEogIBAAKCAQEAvxaEp5iH5T8OGHXa71Dyr8mE+uz+OByYAW6bfyHQneu2OZt8\r\nYqLCTnzDz9u+ELvgRSjkRkuLSsDx/htIhwCvLbHXK6+CXtmr45SSPlQUZaicBeJs\r\nolNuPDkX1W779fQ4NX45GjLk6XYK2ASMkBhHMRPOTBB0v56I/P5XmbFJTWsGw9E/\r\nCtX+NH1nwijpFhGY86DmUmeHmro6IoxNN2Dv0RusuE8jLH8jluV3kvOKVhh974Of\r\nn1k67+xk2TnoXrbL2CKE992v/DIlqSZ5v7cds2luzEoeF38tNdn9goQQQSUILvwk\r\ny+kKEKmeQzzwy5FaCgV5WXrHUGFvZc/Y+0mlGwIDAQABAoIBABzTanWB1quSzy80\r\nxYR+g0MDX7J0AobibAfN8K/FS8bW4lQJtuzbkqZBFKThiD2BVKak3DLCffkWkYAn\r\nYNHaHOhZaz/QJ8GOjUCKjrkk+TgQrwta3yUUTY0mK7NAcnU66dPKqRXhAZPlAQ5v\r\nOT5veyXV0Alnc2/d8YUAtU7zuz7DQvPZ9o6ZJrFis2xVDB6YBPIhU9tHytB5YqhX\r\nd7pFrXKe5lWBUXfhei4fjB3hAMYo1AwlhcBHAaVCy1vu+ncB/HYsfc5pXpVQ/TCi\r\ncQZDRt78akiQOpdjCDtydHqidoonSUPjP1dhuGKQSQb3cx/tOHwtwOKewDpjZV/e\r\nMLCD9hECgYEAxbWaRhaz8TjU+6Buhqy13a8/nVr/nNGsFlMCESliVl9V76erA/qF\r\npgpwY3c2TX9lQmRTPvs4+wsG/MDYxMDpzwEeZWtePyVzXPP/VdvXRd8Ku31rarO5\r\nFwOd7pBHzCG+ba7mpIjs/s/249WWl/qHdDXmwkje3A1jdDcMBJbws8kCgYEA920n\r\nd+zHJ3EYg+kX9qYNEVylAfc3bFhXNdTjYxEgOeL5M0vyuHD8S0flbYcYERKy7ws6\r\n9lmd84iQE86+lw/1CLZvAcXZZdeGRzGlJp3fy+TkSEUlctzFPfdVRdKYEwLTm5nE\r\nOuRHW/4W1nK2daCQbOizJfyM5USSoSHzLQtmm8MCgYBxJxJ4cp3hvOkIajVXlpkv\r\nmxEJef85PTcEP9W7BLhnPoDsfEWALW04LllMU/ocOIE3kjuinB1scE87cROe59no\r\nw3cmDGEQOtrfpDXKadu2/YQi8hD8LIgOB9/nnWO6DMXz+FnAaS1aWKOwmZlqudO0\r\nSvUa1KHXx0HYTXjvV4PDIQKBgG/0bgVvl/Wa0PLvB67NF+ChQPCQwf0+Q8fR2km7\r\nOA+5SfUSCnO2fBI8J+3VUOh4w4oyVK2fgz7srfSoeci0qbUVh0kQEvxn9xRDvGyq\r\nxtblbP3ee8Frb7xIK8d6MOF5R/KCMy5KmJdhc0f5g+HZk0AUUut/SOl8i7RpPjVF\r\nkVotAoGATRYg/LFoNwBUK5ikm6YjuHjj3gGxkDNA8PqBIAsItfZgyxiYfkjLraDy\r\nRLtrZBDLsPUtx8SNQJSVOje0pz3QJG7Rfi9fvivUtH9okVQVFkTk/fDfH2J/tJLu\r\nzmLkt7QPqysKhWgT2Uq/rvBf9jBTipalyoAaq6OFq0i8kCh9rro=\r\n-----END RSA PRIVATE KEY-----\r\n";
    const certificateBlob = new Blob([certificatePem], {
      type: "application/x-x509-ca-cert",
    });
    const certificateUrl = URL.createObjectURL(certificateBlob);

    const certificateLink = document.createElement("a");
    certificateLink.href = certificateUrl;
    certificateLink.download = "certificate.pem";
    certificateLink.click();
  }
  async function serverClick() {
    const certificate =
      "-----BEGIN CERTIFICATE-----\r\nMIIC3TCCAcWgAwIBAgIBATANBgkqhkiG9w0BAQUFADAyMRswGQYDVQQDExJNb3J0\r\nZWFudSBBbGV4YW5kcnUxEzARBgNVBAoTCklTSiBWYXNsdWkwHhcNMjQwNDE4MTY0\r\nNTUwWhcNMjUwNDE4MTY0NTUwWjAyMRswGQYDVQQDExJNb3J0ZWFudSBBbGV4YW5k\r\ncnUxEzARBgNVBAoTCklTSiBWYXNsdWkwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAw\r\nggEKAoIBAQDEIa60iOEEymyA07C2cWRgRKeNm0OFFmnLiMoy83o3654nDcLXKDhX\r\nrWO4MIi1A35DXmDUg6LEybAhGhfS6FBWdR1MwejKEminwzx+0Zh81W+DAJ5qhZig\r\nUOtt65R+wqzqhSKjVue8xfy0cOXQCtvut7f7NniTPfKawhgUDgZAbk7X2OlvtUHX\r\nggpDsPSACEa4NO2ojM8DABhstLYd7s1vxQf95sJchFAap/tbzzBJ0j9P5+UVI8aF\r\nLEmjT2XoRVdvBtwsT/EGqFQSwQRBpgasw8QJDev1QVA0lLIFvAq/gq54Q1f2W7nv\r\nKSm1Z2GZVl93r/VhOMdKb0gyt+NUHnvDAgMBAAEwDQYJKoZIhvcNAQEFBQADggEB\r\nACCpXms52Dc7iR6Ddhu6CN6RpSWsUWNjAPO4/GKv5FWDefN65aG0thIwPdqnpRkt\r\necy39sHtM/obEXvc9gmp8DBBxpS8dJcoCgjQNiKKN5e9kCzWQlFsRcHBpo4Kbuss\r\nfF8GbZkCQ5cNPzc8AU/wBa7nqUeYHgbDioDimSwykm7HpRn1MySAgwDXL6NkiwI0\r\nhChfKwrvrQeYtVGvUvldR0cp8skHPAwQXR1mzR7Qyk9RWX5lcvIJz+buQ0c29YSt\r\n93SubroKY1jQWfJgKUNF5PGP290ThD7iq6PJCDnur7jCSUMWrI9j5dlwFD9UJNb1\r\nwHze0DmmQ8fPzVLlLe0bjiY=\r\n-----END CERTIFICATE-----\r\n";
    const privateKey =
      "-----BEGIN RSA PRIVATE KEY-----\r\nMIIEogIBAAKCAQEAvxaEp5iH5T8OGHXa71Dyr8mE+uz+OByYAW6bfyHQneu2OZt8\r\nYqLCTnzDz9u+ELvgRSjkRkuLSsDx/htIhwCvLbHXK6+CXtmr45SSPlQUZaicBeJs\r\nolNuPDkX1W779fQ4NX45GjLk6XYK2ASMkBhHMRPOTBB0v56I/P5XmbFJTWsGw9E/\r\nCtX+NH1nwijpFhGY86DmUmeHmro6IoxNN2Dv0RusuE8jLH8jluV3kvOKVhh974Of\r\nn1k67+xk2TnoXrbL2CKE992v/DIlqSZ5v7cds2luzEoeF38tNdn9goQQQSUILvwk\r\ny+kKEKmeQzzwy5FaCgV5WXrHUGFvZc/Y+0mlGwIDAQABAoIBABzTanWB1quSzy80\r\nxYR+g0MDX7J0AobibAfN8K/FS8bW4lQJtuzbkqZBFKThiD2BVKak3DLCffkWkYAn\r\nYNHaHOhZaz/QJ8GOjUCKjrkk+TgQrwta3yUUTY0mK7NAcnU66dPKqRXhAZPlAQ5v\r\nOT5veyXV0Alnc2/d8YUAtU7zuz7DQvPZ9o6ZJrFis2xVDB6YBPIhU9tHytB5YqhX\r\nd7pFrXKe5lWBUXfhei4fjB3hAMYo1AwlhcBHAaVCy1vu+ncB/HYsfc5pXpVQ/TCi\r\ncQZDRt78akiQOpdjCDtydHqidoonSUPjP1dhuGKQSQb3cx/tOHwtwOKewDpjZV/e\r\nMLCD9hECgYEAxbWaRhaz8TjU+6Buhqy13a8/nVr/nNGsFlMCESliVl9V76erA/qF\r\npgpwY3c2TX9lQmRTPvs4+wsG/MDYxMDpzwEeZWtePyVzXPP/VdvXRd8Ku31rarO5\r\nFwOd7pBHzCG+ba7mpIjs/s/249WWl/qHdDXmwkje3A1jdDcMBJbws8kCgYEA920n\r\nd+zHJ3EYg+kX9qYNEVylAfc3bFhXNdTjYxEgOeL5M0vyuHD8S0flbYcYERKy7ws6\r\n9lmd84iQE86+lw/1CLZvAcXZZdeGRzGlJp3fy+TkSEUlctzFPfdVRdKYEwLTm5nE\r\nOuRHW/4W1nK2daCQbOizJfyM5USSoSHzLQtmm8MCgYBxJxJ4cp3hvOkIajVXlpkv\r\nmxEJef85PTcEP9W7BLhnPoDsfEWALW04LllMU/ocOIE3kjuinB1scE87cROe59no\r\nw3cmDGEQOtrfpDXKadu2/YQi8hD8LIgOB9/nnWO6DMXz+FnAaS1aWKOwmZlqudO0\r\nSvUa1KHXx0HYTXjvV4PDIQKBgG/0bgVvl/Wa0PLvB67NF+ChQPCQwf0+Q8fR2km7\r\nOA+5SfUSCnO2fBI8J+3VUOh4w4oyVK2fgz7srfSoeci0qbUVh0kQEvxn9xRDvGyq\r\nxtblbP3ee8Frb7xIK8d6MOF5R/KCMy5KmJdhc0f5g+HZk0AUUut/SOl8i7RpPjVF\r\nkVotAoGATRYg/LFoNwBUK5ikm6YjuHjj3gGxkDNA8PqBIAsItfZgyxiYfkjLraDy\r\nRLtrZBDLsPUtx8SNQJSVOje0pz3QJG7Rfi9fvivUtH9okVQVFkTk/fDfH2J/tJLu\r\nzmLkt7QPqysKhWgT2Uq/rvBf9jBTipalyoAaq6OFq0i8kCh9rro=\r\n-----END RSA PRIVATE KEY-----\r\n";

    const data: AxiosRequestConfig<any> = {
      data: {
        certificate,
        privateKey,
      },
    };
    const res = await axios.post("https://localhost:8080/api/retrive", data);
    console.log(res);
  }
  return (
    <>
      <div onClick={downloadCertificate}>download CF</div>
      <div onClick={downloadPrivateKey}>download PK</div>
      <div onClick={serverClick}>serverClick</div>
    </>
  );
}
