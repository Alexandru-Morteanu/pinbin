import React from "react";
import { getStateColor } from "../../../constants";
import { DataItem } from "../sesizari/MapContent";

type Props = {
  dataPin: DataItem;
};

export default function Main({ dataPin }: Props) {
  return (
    <>
      <div className={`${getStateColor(dataPin.status)}`}>{dataPin.status}</div>
      <div>
        <strong>Eticheta</strong>:<p>{dataPin.label}</p>
      </div>
      <div>
        <strong>De catre</strong>: <p>{dataPin.name}</p>
      </div>
      <div>
        <strong>Detalii</strong>:<p>{dataPin.detalii_cet}</p>{" "}
      </div>
      <div>
        <strong>Creat la data</strong>:
        <p>
          {new Date(dataPin.created_at).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZoneName: "short",
          })}
        </p>
      </div>
      <div>{dataPin.verified ? "✅" : "❎ Not"} Verified</div>
      {/* <div> Verified</div> */}
    </>
  );
}
