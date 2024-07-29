import { LatLngTuple } from "leaflet";
import React, { FC, MouseEventHandler } from "react";
import { MapContainer } from "react-leaflet";
import MapContent, { DataItem } from "./MapContent";
import { Form } from "../components/Blockchain";

type Props = {
  admin?: boolean;
  handleDelete?: (id: number) => void;
  setEventLocations?: Function;
  setCurrentPin?: Function;
  dataAboutPin?: any;
  searchTerm?: string;
  handleSearch?: boolean;
  refresh?: boolean;
};

export default function Map({
  admin,
  handleDelete,
  setEventLocations,
  setCurrentPin,
  dataAboutPin,
  searchTerm,
  handleSearch,
  refresh,
}: Props) {
  const position: LatLngTuple = [46, 25];

  return (
    <MapContainer
      center={position}
      zoom={6}
      style={{
        height: "100vh",
        width: "100vw",
        zIndex: 0,
      }}
    >
      <MapContent
        searchTerm={searchTerm}
        admin={admin}
        handleDelete={handleDelete}
        setEventLocations={setEventLocations}
        setCurrentPin={setCurrentPin}
        dataAboutPin={dataAboutPin}
        search={handleSearch}
        refresh={refresh}
      />
    </MapContainer>
  );
}
