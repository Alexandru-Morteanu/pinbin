import React, { useEffect, useState } from "react";
import { getStateColor } from "../../../constants";
import { DataItem } from "../sesizari/MapContent";
import { supabase } from "./supabase";

type Props = {
  dataPin: DataItem;
  blockPin: any;
};

export default function Main({ dataPin, blockPin }: Props) {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Download the image from Supabase storage
        const { data, error } = await supabase.storage
          .from("Imagini")
          .download(dataPin.imgName);

        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setImageUrl(url);
      } catch (error) {
        console.error("Error downloading image:");
      }
    };

    fetchImage();
  }, [dataPin.imgName]);

  return (
    <div className="p-4 px-5 bg-white rounded-lg">
      <div className="flex items-center space-x-4">
        <img
          src={imageUrl}
          alt="Carosabil uzat"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {dataPin.label}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Adaugat de: {dataPin.name}
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-yellow-500">&#9733; 4.5</span>
            {blockPin === undefined ? (
              <span className={`${getStateColor(dataPin.status)}`}>
                {dataPin.status}
              </span>
            ) : (
              <span className={`${getStateColor(blockPin.status)}`}>
                {blockPin.status}
              </span>
            )}
          </div>
          <p
            className=" cursor-pointer text-xs text-green-500 mt-2 flex items-center font-inter"
            style={{
              fontWeight: "900",
            }}
          >
            <svg
              viewBox="0 0 384 512"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              className="inline-block"
            >
              <path d="m172.268 501.67c-145.298-210.639-172.268-232.257-172.268-309.67 0-106.039 85.961-192 192-192s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zm19.732-229.67c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
            </svg>
            BARLAD, ROMANIA
          </p>
          <div className="flex mt-2">
            {!dataPin.verified ? (
              <>
                <svg
                  fill="none"
                  height="24"
                  viewBox="0 0 40 40"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  >
                    <path d="m21.7653 7.15755c.346-.2227.519-.33405.6593-.40658 1.7733-.91684 3.9493-.08002 4.6514 1.78873.0555.14785.1093.34642.217.74358.0497.18337.0745.27506.1023.35941.3363 1.02191 1.1452 1.81871 2.1721 2.13961.0847.0265.1768.0499.3609.0969l.2499.0637c.865.2205 1.2975.3307 1.6134.4874 1.4358.712 2.1617 2.345 1.7282 3.8879-.0954.3394-.3033.7344-.7193 1.5242l-.1201.2283c-.0885.1681-.1328.2521-.1699.3328-.4499.9773-.4004 2.1116.1329 3.046.044.0771.0954.157.1982.3167.2227.3461.3341.5191.4066.6594.9169 1.7732.08 3.9493-1.7887 4.6513-.1479.0555-.3464.1093-.7436.217-.1834.0497-.275.0745-.3594.1023-1.0219.3363-1.8187 1.1452-2.1396 2.1721-.0265.0847-.0499.1768-.0969.3609l-.0637.2499c-.2205.865-.3307 1.2976-.4874 1.6134-.712 1.4358-2.345 2.1617-3.8879 1.7282-.3394-.0954-.7344-.3033-1.5243-.7192l-.2282-.1202c-.1681-.0885-.2521-.1328-.3328-.1699-.9773-.4499-2.1116-.4004-3.046.1329-.0771.044-.157.0954-.3168.1983-.346.2226-.519.334-.6593.4065-1.7732.9169-3.9493.0801-4.6513-1.7887-.0555-.1478-.1094-.3464-.217-.7436-.0497-.1833-.0745-.275-.1023-.3594-.3363-1.0219-1.1452-1.8187-2.1721-2.1396-.0847-.0265-.1768-.0499-.3609-.0969l-.24992-.0637c-.86503-.2205-1.29755-.3307-1.61343-.4874-1.43578-.712-2.16164-2.345-1.72816-3.8879.09536-.3394.30332-.7343.71923-1.5242l.12017-.2283c.08852-.1681.13277-.2521.16991-.3328.44984-.9773.40035-2.1116-.13291-3.046-.04402-.0771-.09543-.157-.19825-.3167-.2227-.346-.33405-.5191-.40659-.6594-.91684-1.7732-.08002-3.9492 1.78873-4.6513.14785-.0555.34643-.1093.74359-.217.18337-.0497.27505-.0745.35941-.1023 1.02192-.3363 1.81872-1.1452 2.13962-2.1721.0264-.0847.0499-.1768.0968-.3609l.0637-.2499c.2206-.86504.3308-1.29756.4875-1.61344.712-1.43577 2.345-2.16163 3.8878-1.72816.3395.09537.7344.30333 1.5243.71924l.2282.12017c.1681.08851.2522.13277.3329.1699.9773.44985 2.1116.40035 3.046-.13291.0771-.04402.157-.09543.3167-.19825z" />
                    <path d="m15.8333 24.1666 4.1666-4.1667m0 0 4.1667-4.1666m-4.1667 4.1666 4.1667 4.1667m-4.1667-4.1667-4.1666-4.1666" />
                  </g>
                </svg>
                <div>Not verified</div>
              </>
            ) : (
              <>
                <svg
                  enable-background="new 0 0 24 24"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m0 0h24v24h-24z" fill="none" />
                  <path d="m0 0h24v24h-24z" fill="none" />
                  <path d="m23 12-2.44-2.79.34-3.69-3.61-.82-1.89-3.2-3.4 1.46-3.4-1.46-1.89 3.19-3.61.81.34 3.7-2.44 2.8 2.44 2.79-.34 3.7 3.61.82 1.89 3.19 3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69zm-13.62 4.01-2.38-2.4c-.39-.39-.39-1.02 0-1.41l.07-.07c.39-.39 1.03-.39 1.42 0l1.61 1.62 5.15-5.16c.39-.39 1.03-.39 1.42 0l.07.07c.39.39.39 1.02 0 1.41l-5.92 5.94c-.41.39-1.04.39-1.44 0z" />
                </svg>
                <div>Verified</div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="border-t border-gray-300 dark:border-gray-600 w-9/12 mt-3"></div>
      </div>
      {blockPin === undefined ? (
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-4">
          {dataPin.detalii_cet}
        </p>
      ) : (
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-4">
          Subsemantul {blockPin.name}, {blockPin.detalii}
        </p>
      )}

      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
        Postat la data de:{" "}
        {new Date(dataPin.created_at).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </p>
      <button className="w-full mt-4 py-2 rounded bg-gray-200 text-gray-700">
        Arata coordonatele
      </button>
    </div>
  );
}
