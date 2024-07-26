"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Blockchain, { Form } from "../components/Blockchain";
import { DataItem } from "../sesizari/MapContent";
import { supabase } from "../components/supabase";
import { getStateColor } from "../../../constants";
import AdminContent from "./AdminContent";
import axiosInstance from "../components/axios";
import Search from "../components/Search";
import { Checkbox } from "@/components/ui/checkbox";
import Main from "../components/Main";
import Ong from "../components/Ong";

const Map = dynamic(() => import("../sesizari/Map"), { ssr: false });

type Props = {
  admin?: boolean;
  ong?: boolean;
  adminData?: any;
};

export default function Admin({ admin, adminData, ong }: Props) {
  const [dataAboutPins, setDataAboutPins] = useState();
  const [events, setEvents] = useState<Array<Form>>([]);
  const [description, setDescription] = useState("");
  const [dataPin, setDataPin] = useState<DataItem>();
  const [currentUser, setCurrentUser] = useState<number>(1);
  const [secondButton, setSecondButton] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [handleSearch, setHandleSearch] = useState<boolean>();
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [refresh, setRefresh] = useState<boolean>();

  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    dataPin?.status
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    setSelectedOption(dataPin?.status);
    console.log(dataPin);
  }, [dataPin]);

  useEffect(() => {
    if (ong) {
      setCurrentUser(2);
    } else if (admin) {
      setCurrentUser(3);
    }
  }, [admin, ong]);

  const handleSaveClick = async () => {
    if (description && selectedOption) {
      const data = {
        descriere: description,
        prevState: dataPin?.status,
        currentState: selectedOption,
        pinId: dataPin?.id,
      };

      const { data: insertedData, error } = await supabase
        .from("History")
        .insert([data]);
      const res = await supabase
        .from("PointsTrash")
        .update({ status: selectedOption, descriere: description })
        .eq("id", dataPin?.id);
      if (error) {
        throw error;
      }

      console.log("Data inserted successfully:", insertedData);
    } else {
      console.error("Description or selected status is missing.");
    }
  };

  const fetchSuggestions = async (query: string) => {
    try {
      const response = await axiosInstance.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5`
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:");
    }
  };

  useEffect(() => {
    if (searchTerm.length > 1) {
      fetchSuggestions(searchTerm);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  return (
    <div className="">
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setHandleSearch={setHandleSearch}
        handleSearch={handleSearch}
        suggestions={suggestions}
      />
      <div className="flex mt-36">
        <Map
          handleSearch={handleSearch}
          searchTerm={searchTerm}
          dataAboutPin={dataAboutPins}
          events={events}
          setCurrentPin={setDataPin}
          refresh={refresh}
        />
        <div className="bg-black w-[400px] h-[400px] ml-7 color-white">
          <div className="p-5 opacity-80">
            {dataPin?.points && (
              <>
                <div className="flex">
                  <p>
                    {dataPin?.points[0]}
                    {`<->`}
                  </p>
                  <p> {dataPin?.points[1]}</p>
                </div>{" "}
                <div className="flex">
                  <div
                    className={
                      secondButton === ""
                        ? `border border-slate-300 rounded px-2 text-slate-300 cursor-pointer`
                        : "cursor-pointer px-2"
                    }
                    onClick={() => setSecondButton("")}
                  >
                    MAIN
                  </div>
                  {currentUser === 2 ? (
                    <div
                      className={
                        secondButton === "ong"
                          ? `border border-slate-300 rounded px-2 text-slate-300 cursor-pointer`
                          : "cursor-pointer px-2"
                      }
                      onClick={() => setSecondButton("ong")}
                    >
                      ONG
                    </div>
                  ) : (
                    currentUser === 3 && (
                      <div
                        className={
                          secondButton === "admin"
                            ? `border border-slate-300 rounded px-2 text-slate-300 cursor-pointer`
                            : "cursor-pointer px-2"
                        }
                        onClick={() => setSecondButton("admin")}
                      >
                        ADMIN
                      </div>
                    )
                  )}
                </div>
                <div>
                  {secondButton === "admin" ? (
                    <AdminContent
                      selectedOption={selectedOption}
                      handleChange={handleChange}
                    ></AdminContent>
                  ) : secondButton === "ong" ? (
                    <Ong
                      dataPin={dataPin}
                      setRefresh={setRefresh}
                      refresh={refresh}
                      setDataPin={setDataPin}
                    />
                  ) : (
                    <Main dataPin={dataPin} />
                  )}
                </div>
              </>
            )}
            <Blockchain
              secondButton={secondButton}
              adminData={adminData}
              selectedOption={selectedOption}
              dataPin={dataPin}
              setEventuri={setDataAboutPins}
            />
          </div>
        </div>
      </div>
      <div>Filtreaza etichetele:</div>
      <div className="py-3">
        {[
          "Carosabil stricat",
          "Pereti vandalizati",
          "Deseuri",
          "Oameni ai strazii",
          "Inundatii",
          "Cladiri distruse",
          "Fara eticheta",
        ].map((label) => (
          <div key={label}>
            <Checkbox /> {label}
          </div>
        ))}
      </div>
    </div>
  );
}
