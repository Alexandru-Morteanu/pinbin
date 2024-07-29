import React, { useState, ChangeEventHandler, useEffect } from "react";
import Blockchain from "./Blockchain";
import Main from "./Main";
import Ong from "./Ong";
import AdminContent from "../admin/AdminContent";
import { Checkbox } from "@/components/ui/checkbox";
import { DataItem } from "../sesizari/MapContent";
import { getStateColor } from "../../../constants";
import { supabase } from "./supabase";

type Props = {
  dataPin: DataItem;
  currentUser: number;
  secondButton: string;
  setSecondButton: (value: string) => void;
  selectedOption?: string;
  handleChange: ChangeEventHandler<HTMLSelectElement>;
  setRefresh: (value: boolean) => void;
  refresh?: boolean;
  setDataPin: (data: any) => void;
  adminData: any;
  dataAboutPins: any;
};

const Sidebar = ({
  dataPin,
  currentUser,
  secondButton,
  setSecondButton,
  selectedOption,
  handleChange,
  setRefresh,
  refresh,
  setDataPin,
  adminData,
  dataAboutPins,
}: Props) => {
  const [activeLabel, setActiveLabel] = useState("");
  const [blockPin, setBlockPin] = useState(undefined);

  const labels = [
    "Carosabil uzat",
    "Pereti vandalizati",
    "Deseuri",
    "Oameni ai strazii",
    "Inundatii",
    "Cladiri distruse",
    "Fara eticheta",
  ];

  const handleLabelClick = (label: string) => {
    setActiveLabel(activeLabel === label ? "" : label);
  };

  useEffect(() => {
    const match = dataAboutPins.find(
      (dangerousPoint: any) =>
        //@ts-ignore
        parseFloat(dangerousPoint.lat) === parseFloat(dataPin.points[0]) &&
        //@ts-ignore
        parseFloat(dangerousPoint.lng) === parseFloat(dataPin.points[1])
    );
    console.log(match);
    if (match) {
      setBlockPin(match);
    } else {
      setBlockPin(undefined);
    }
  }, [dataAboutPins, dataPin]);

  return (
    <>
      <div className="pb-3 px-5 font-inter font-semibold">
        <h2 className="text-xs font-semibold text-gray-900 dark:text-white">
          DESCOPERA PROBLEMELE DIN{" "}
          <span
            className="text-green-500 cursor-pointer "
            style={{
              fontWeight: "900",
            }}
          >
            BARLAD, ROMANIA
          </span>
        </h2>
        <div className="mt-4 flex space-x-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
          <button className="px-3 py-1 rounded-full bg-white border border-gray-300 text-gray-700 flex items-center justify-center whitespace-nowrap">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15 11a4.002 4.002 0 0 1-3.874-3H3a1 1 0 0 1 0-2h8.126a4.002 4.002 0 0 1 7.748 0H21a1 1 0 1 1 0 2h-2.126A4.002 4.002 0 0 1 15 11zM3 16a1 1 0 1 0 0 2h2.126a4.002 4.002 0 0 0 7.748 0H21a1 1 0 1 0 0-2h-8.126a4.002 4.002 0 0 0-7.748 0H3zm12-7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-4 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"
                fill="currentColor"
              />
            </svg>
          </button>

          {labels.map((label) => (
            <button
              key={label}
              className={`px-3 py-1 rounded-full bg-white border ${
                activeLabel === label
                  ? "border-green-500 text-green-500"
                  : "border-gray-300 text-gray-700"
              } whitespace-nowrap`}
              onClick={() => handleLabelClick(label)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-300 dark:border-gray-600 "></div>
      <div className="flex mt-2 mx-6">
        {currentUser === 2 ? (
          <>
            <div
              className={`cursor-pointer px-3 py-1 rounded-full ${
                secondButton === ""
                  ? "border border-green-500 text-green-500"
                  : ""
              }`}
              onClick={() => setSecondButton("")}
            >
              MAIN
            </div>
            <div
              className={`cursor-pointer px-3 py-1 rounded-full ${
                secondButton === "ong"
                  ? "border border-green-500 text-green-500"
                  : ""
              }`}
              onClick={() => setSecondButton("ong")}
            >
              ONG
            </div>
          </>
        ) : (
          currentUser === 3 && (
            <>
              <div
                className={`cursor-pointer px-3 py-1 rounded-full ${
                  secondButton === ""
                    ? "border border-green-500 text-green-500"
                    : ""
                }`}
                onClick={() => setSecondButton("")}
              >
                MAIN
              </div>
              <div
                className={`cursor-pointer px-3 py-1 rounded-full ${
                  secondButton === "admin"
                    ? "border border-green-500 text-green-500"
                    : ""
                }`}
                onClick={() => setSecondButton("admin")}
              >
                ADMIN
              </div>
            </>
          )
        )}
      </div>
      <div className="px-6 mt-2 text-red-600">
        {dataAboutPins.some(
          (dangerousPoint: any) =>
            //@ts-ignore
            parseFloat(dangerousPoint.lat) === parseFloat(dataPin.points[0]) &&
            //@ts-ignore
            parseFloat(dangerousPoint.lng) === parseFloat(dataPin.points[1])
        ) && <>Finalizat</>}
      </div>
      <div className="mx-6">
        {secondButton === "admin" ? (
          <AdminContent
            selectedOption={selectedOption}
            handleChange={handleChange}
          />
        ) : secondButton === "ong" ? (
          <Ong
            dataPin={dataPin}
            setRefresh={setRefresh}
            refresh={refresh}
            setDataPin={setDataPin}
          />
        ) : (
          <Main blockPin={blockPin} dataPin={dataPin} />
        )}
      </div>
    </>
  );
};

export default Sidebar;
