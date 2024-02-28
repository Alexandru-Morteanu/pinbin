"use client";
import { useEffect, useState } from "react";
import Web3 from "web3";
import {
  CONTRACT_ABI,
  CONTRACT_ADRESS,
  initialState,
  PRIVATE_KEY,
} from "../../../constants";
import { fixedPointToFloat, floatToFixedPoint } from "../components/floatnum";

type Steps = {
  initiate: boolean;
  transactionCount: boolean;
  gasPrice: boolean;
  estimateGas: boolean;
  signedTransaction: boolean;
  send: boolean;
};

export type Form = {
  lat: number | null;
  lng: number | null;
  name: string;
  date: string;
  timestamp?: any;
};

type Props = {
  eventLocations: Array<number>;
  setEventuri: Function;
};

export default function Blockchain({ eventLocations, setEventuri }: Props) {
  let [web3, setWeb3] = useState<any>();
  const contractAddress = CONTRACT_ADRESS;
  const contractAbi = CONTRACT_ABI;
  let [contract, setContract] = useState<any>();

  useEffect(() => {
    //@ts-ignore
    if (typeof window !== "undefined" && window.ethereum) {
      console.log("1");
      //@ts-ignore
      setWeb3(new Web3(window.ethereum));
    }
  }, []);

  useEffect(() => {
    if (web3 !== undefined)
      setContract(new web3.eth.Contract(contractAbi, contractAddress));
  }, [web3]);

  useEffect(() => {
    if (contract !== undefined) fetchData();
  }, [contract]);

  const [formData, setFormData] = useState<Form>({
    lat: null,
    lng: null,
    name: "",
    date: "",
  });
  const [steps, setSteps] = useState<Steps>(initialState);
  const [events, setEvents] = useState<Array<Form>>([]);

  async function fetchData() {
    const res = await contract.getPastEvents("DataUpdated", {
      fromBlock: 0,
      toBlock: "latest",
    });
    const last3Events = res.slice(Math.max(res.length - 10, 0));
    const eventData = last3Events.map((event: any) => {
      const decodedData = web3.eth.abi.decodeParameters(
        ["uint256", "uint256", "string", "uint256"],
        event.data
      );
      const timestampBigInt = decodedData["3"] as BigInt;
      const timestampNumber = Number(timestampBigInt);
      const timestamp = new Date(timestampNumber);
      const latBig = decodedData["0"] as BigInt;
      const latNum = Number(latBig);
      const lat = fixedPointToFloat(latNum, 51);
      const lngBig = decodedData["1"] as BigInt;
      const lngNum = Number(lngBig);
      const lng = fixedPointToFloat(lngNum, 51);
      return {
        lat: lat,
        lng: lng,
        name: decodedData["2"],
        timestamp: timestamp.toDateString(),
      };
    });
    setEventuri(eventData);
    setEvents(eventData.slice(-3));
  }

  async function prepareTransaction(newValue: Form) {
    //@ts-ignore
    await window.ethereum.enable();
    const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
    setSteps((prevSteps) => ({ ...prevSteps, initiate: true }));
    const nonce = await web3.eth.getTransactionCount(account.address);
    setSteps((prevSteps) => ({ ...prevSteps, transactionCount: true }));

    const lat = floatToFixedPoint(newValue.lat as number, 51);
    const lng = floatToFixedPoint(newValue.lng as number, 51);
    const timestamp = new Date(newValue.date).getTime();
    const transaction = contract.methods
      .set(lat, lng, newValue.name, timestamp)
      .encodeABI();

    const gasPrice = await web3.eth.getGasPrice();
    setSteps((prevSteps) => ({ ...prevSteps, gasPrice: true }));
    const gasPriceNumeric = Math.floor(Number(gasPrice) * 1.2);
    const increasedGasPrice = BigInt(gasPriceNumeric);

    const gasEstimate = await web3.eth.estimateGas({
      to: contractAddress,
      data: transaction,
      from: account.address,
    });
    setSteps((prevSteps) => ({ ...prevSteps, estimateGas: true }));

    const signedTransaction = await web3.eth.accounts.signTransaction(
      {
        to: contractAddress,
        data: transaction,
        gas: gasEstimate,
        gasPrice: increasedGasPrice,
        from: account.address,
        nonce: nonce,
      },
      PRIVATE_KEY
    );
    setSteps((prevSteps) => ({ ...prevSteps, signedTransaction: true }));
    return signedTransaction;
  }

  const loadingBar =
    (Object.values(steps).filter(Boolean).length / Object.keys(steps).length) *
    100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSteps(initialState);
    const signedTransaction = await prepareTransaction(formData);
    await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
    setSteps((prevSteps) => ({ ...prevSteps, send: true }));
    fetchData();
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      lat: eventLocations[0],
      lng: eventLocations[1],
    }));
  }, [eventLocations]);

  return (
    <div className="mt-7">
      <div className=" flex justify-center gap-6">
        <div>
          <div className=" bg-red-500 flex justify-center"> Process</div>
          {Object.entries(steps).map(([step, value]) => (
            <div
              key={step}
              style={{
                backgroundColor: value ? "green" : "black",
                color: "white",
                padding: "10px",
                marginBlock: "5px",
              }}
            >
              {step}
            </div>
          ))}
          <div style={{ marginTop: "20px" }}>
            Loading: {loadingBar.toFixed(2)}%
            <div
              className={`h-2 bg-blue-500 mt-1 transition-width duration-500 ease-in-out`}
              style={{ width: `${loadingBar}%` }}
            ></div>
          </div>
        </div>
        <div className="flex flex-col">
          <form
            onSubmit={handleSubmit}
            className=" text-black max-w-md mx-auto p-6 bg-white rounded-md shadow-md"
          >
            <div className="mb-4">
              <label
                htmlFor="lat"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Latitude:
              </label>
              <input
                type="number"
                id="lat"
                name="lat"
                value={eventLocations[0]}
                readOnly
                className="w-full border rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lng"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Longitude:
              </label>
              <input
                type="number"
                id="lng"
                name="lng"
                value={eventLocations[1]}
                readOnly
                className="w-full border rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Date:
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border rounded-md py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="space-y-4 text-blue-700 pt-8">
        {events
          .slice()
          .reverse()
          .map((event, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-md">
              <p className="font-bold text-lg">Event #{index + 1}</p>
              <div className="flex flex-col">
                <p>Lat: {event.lat}</p>
                <p>Lng: {event.lng}</p>
                <p>Name: {event.name}</p>
                <p>Timestamp: {event.timestamp}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
