export const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mdmhnYnJheXdkc3hjZnBmbHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAyMjM4NzcsImV4cCI6MjAxNTc5OTg3N30.2Z7-PEOJWSphoxmQb2Q_M2q9UxUaS3Y-KAuxkIKbvw4";
export const SUPABASE_URL = "https://ofvhgbraywdsxcfpflvv.supabase.co";
export const STATES = {
  BUTTON: "button",
  CAMERA: "camera",
  MAP: "map",
};
export type Data = {
  x: number;
  y: number;
  imgName: string;
};
export const CONTRACT_ADRESS = "0x688013e1009708d8Fa78EE2F1f3D59532Ce01477";
//0x06F01f3DF1902758a744050B0d9968f50dea86Ad
export const PRIVATE_KEY =
  "0x17386e1eed13c6c5a9fb8c81003ea9562fc98cf9268edadfdcd8def5ae66caa3";
export const initialState = {
  initiate: false,
  transactionCount: false,
  gasPrice: false,
  estimateGas: false,
  signedTransaction: false,
  send: false,
};
export const CONTRACT_ABI: any = [
  {
    constant: false,
    inputs: [
      {
        name: "x",
        type: "uint256",
      },
      {
        name: "y",
        type: "uint256",
      },
      {
        name: "name",
        type: "string",
      },
      {
        name: "date",
        type: "uint256",
      },
    ],
    name: "set",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "y",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "DataUpdated",
    type: "event",
  },
];
export function getStateColor(state: string): string {
  console.log(state);
  switch (state) {
    case "Problem":
      return "text-orange-400";
    case "Solved":
      return "text-green-700";
    case "AI Mistake":
      return "text-red-700";
    default:
      return "";
  }
}
