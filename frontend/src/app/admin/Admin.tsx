"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Blockchain, { Form } from "../components/Blockchain";
import { DataItem } from "../sesizari/MapContent";
import { supabase } from "../components/supabase";
import AdminContent from "./AdminContent";
import axiosInstance from "../components/axios";
import Search from "../components/Search";
import { Checkbox } from "@/components/ui/checkbox";
import Main from "../components/Main";
import Ong from "../components/Ong";
import Sidebar from "../components/Sidebar";

const Map = dynamic(() => import("../sesizari/Map"), { ssr: false });

type Props = {
  admin?: boolean;
  ong?: boolean;
  adminData?: any;
};

export default function Admin({ admin, adminData, ong }: Props) {
  const [dataAboutPins, setDataAboutPins] = useState();
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
    <>
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setHandleSearch={setHandleSearch}
        handleSearch={handleSearch}
        suggestions={suggestions}
      />
      <div className="relative w-full h-full pt-[68px] flex">
        <aside
          className={`flex flex-col ${
            dataPin && "w-[500px]"
          } h-screen py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700`}
        >
          <div className="flex flex-col flex-grow">
            {dataPin && (
              <Sidebar
                dataPin={dataPin}
                currentUser={currentUser}
                secondButton={secondButton}
                setSecondButton={setSecondButton}
                selectedOption={selectedOption}
                handleChange={handleChange}
                setRefresh={setRefresh}
                refresh={refresh}
                setDataPin={setDataPin}
                adminData={adminData}
                dataAboutPins={dataAboutPins}
              />
            )}
            <Blockchain
              secondButton={secondButton}
              adminData={adminData}
              selectedOption={selectedOption}
              dataPin={dataPin}
              setEventuri={setDataAboutPins}
            />{" "}
          </div>
        </aside>
        <Map
          admin={admin}
          handleSearch={handleSearch}
          searchTerm={searchTerm}
          dataAboutPin={dataAboutPins}
          setCurrentPin={setDataPin}
          refresh={refresh}
        />
      </div>
    </>
  );
}
