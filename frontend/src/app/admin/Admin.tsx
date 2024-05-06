"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { Form } from "../components/Blockchain";
import { DataItem } from "../sesizari/MapContent";
import { supabase } from "../components/supabase";
import { getStateColor } from "../../../constants";
const Map = dynamic(() => import("../sesizari/Map"), { ssr: false });

type Props = {
  admin: boolean;
};

export default function Admin({ admin }: Props) {
  const [eventLocations, setEventLocations] = useState<Array<number>>([0, 0]);
  const [events, setEvents] = useState<Array<Form>>([]);
  const [description, setDescription] = useState("");
  const [dataPin, setDataPin] = useState<DataItem>();
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    dataPin?.status
  );
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    setSelectedOption(dataPin?.status);
  }, [dataPin]);

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

  return (
    <div className="flex">
      <Map
        setEventLocations={setEventLocations}
        events={events}
        setCurrentPin={setDataPin}
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
              <p>
                {admin ? (
                  <select
                    className=" bg-black rounded-lg"
                    value={selectedOption}
                    onChange={handleChange}
                  >
                    <option
                      style={{ background: "orange" }}
                      className="text-black"
                    >
                      Problem
                    </option>
                    <option
                      style={{ background: "green" }}
                      className="text-black"
                    >
                      Solved
                    </option>
                    <option
                      style={{ background: "red" }}
                      className="text-black"
                    >
                      AI Mistake
                    </option>
                  </select>
                ) : (
                  <div className={`${getStateColor(dataPin.status)}`}>
                    {dataPin.status}
                  </div>
                )}
              </p>
              {selectedOption !== dataPin.status ? (
                <>
                  <textarea
                    className=" bg-black text-white my-2 border-white border rounded-md h-[230px] w-full p-2 "
                    placeholder="Descriere"
                    value={description}
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                  />
                  <button
                    onClick={handleSaveClick}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                  >
                    Save
                  </button>
                </>
              ) : (
                <div>{dataPin.descriere}</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
