"use client";
import { useEffect, useState } from "react";
import { supabase } from "../components/supabase";
import { getStateColor } from "../../../constants";
import axios from "axios";
import https from "https";

type HistoryItem = {
  id: number;
  descriere: string;
  prevState: string;
  currentState: string;
  pinId: string;
  created_at: string;
};

export default function Page() {
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);

  useEffect(() => {
    async function fetchHistoryData() {
      const { data, error } = await supabase.from("History").select("*");
      // const res = await axios.get("https://localhost:8080/api/retrive");
      const instance = axios.get("https://localhost:8080/api/retrive", {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      });
      await instance;
      setHistoryData(data || []);
    }

    fetchHistoryData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">History Data</h1>
      <ul>
        {/* Map over the historyData array and render each item */}
        {historyData
          .slice()
          .reverse()
          .map((item) => (
            <li
              key={item.id}
              className="bg-gray-100 rounded-lg p-4 mb-4 text-black flex gap-3"
            >
              <div>
                <strong>Pin ID:</strong> {item.pinId}
              </div>

              <div className={`mb-2`}>
                <strong>Prev State:</strong>
                <div className={`${getStateColor(item.prevState)}`}>
                  {item.prevState}
                </div>
              </div>
              <div className="mb-2">
                <strong>Current State:</strong>
                <div className={`${getStateColor(item.currentState)}`}>
                  {item.currentState}
                </div>
              </div>
              <div className="mb-2">
                <strong>Description:</strong> {item.descriere}
              </div>
              <div>
                <strong>Created_at</strong> {item.created_at}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
