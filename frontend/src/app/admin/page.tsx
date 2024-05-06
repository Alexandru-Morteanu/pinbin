"use client";
import axios, { AxiosRequestConfig } from "axios";
import dynamic from "next/dynamic";
import https from "http";
import React, { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { Form } from "../components/Blockchain";
import Admin from "./Admin";
type Contract = {
  commonName: string;
  organization: string;
  id: number;
};

export default function Page() {
  const [cookies, , removeCookie] = useCookies(["jwtToken"]);

  const [contracts, setContracts] = useState<Contract[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [adminData, setAdminData] = useState<any>();
  const [eventLocations, setEventLocations] = useState<Array<number>>([0, 0]);
  const [events, setEvents] = useState<Array<Form>>([]);

  const [selectedContract, setSelectedContract] = useState<Contract | null>(
    null
  );
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchContracts();
  }, []);

  useEffect(() => {
    fetchContracts();
  }, [cookies]);

  async function fetchContracts() {
    try {
      const token = cookies.jwtToken;
      if (token) {
        setHasToken(true);
        const res = await axios.post("https://localhost:8080/api/verifyToken", {
          token,
        });
        setAdminData(res.data);
      } else {
        setHasToken(false);
        const res = await axios.get("https://localhost:8080/api/retrive");
        setContracts(res.data.contracts);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleContractClick = (contract: Contract) => {
    setSelectedContract(contract);
    setShowPopup(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          const fileContent = event.target.result;
          setSelectedFile(fileContent as string);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleClosePopup = async () => {
    setShowPopup(false);
    setSelectedContract(null);
    if (selectedFile) {
      try {
        const data: AxiosRequestConfig<any> = {
          data: {
            certificate: selectedContract?.id,
            privateKey: selectedFile,
          },
        };
        const res = await axios.post(
          "https://localhost:8080/api/validate",
          data
        );
        const token = res.data.token;
        document.cookie = `jwtToken=${token}; Path=/; Secure; SameSite=Strict`;
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };
  return (
    <div className=" w-full">
      {!hasToken ? (
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold my-8">Certificate</h1>
          <div className="grid grid-cols-2 gap-4">
            {contracts.map((contract, index) => (
              <div
                key={index}
                className="border cursor-pointer p-4 rounded-lg shadow-md flex flex-col"
                onClick={() => handleContractClick(contract)}
              >
                <h2 className="text-xl font-semibold">{contract.commonName}</h2>
                <p className="text-gray-600">{contract.organization}</p>
              </div>
            ))}
          </div>
          {showPopup && (
            <div className="fixed text-black top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-8 rounded-lg shadow-md" ref={popupRef}>
                <h2 className="text-xl font-semibold mb-4">Private Key</h2>
                <p className="mb-4">
                  Common Name: {selectedContract?.commonName}
                </p>
                <p className="mb-4">
                  Organization: {selectedContract?.organization}
                </p>
                <div className="flex flex-col">
                  <input
                    type="file"
                    accept=".pem"
                    onChange={handleFileChange}
                    className="border rounded-lg p-2 mb-4"
                  />
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={handleClosePopup}
                  >
                    Validate
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div>{adminData?.nume}</div>
          <div>{adminData?.organizatie}</div>
          <Admin admin={true} />
          <div
            className=" cursor-pointer"
            onClick={() => {
              removeCookie("jwtToken", { path: "/" });
              fetchContracts();
            }}
          >
            Log out
          </div>
        </div>
      )}
    </div>
  );
}
