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
  events: Array<Form>;
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
  events,
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
      style={{ height: "400px", width: "100%", zIndex: 45 }}
    >
      <MapContent
        searchTerm={searchTerm}
        admin={admin}
        handleDelete={handleDelete}
        setEventLocations={setEventLocations}
        events={events}
        setCurrentPin={setCurrentPin}
        dataAboutPin={dataAboutPin}
        search={handleSearch}
        refresh={refresh}
      />
    </MapContainer>
  );
}
