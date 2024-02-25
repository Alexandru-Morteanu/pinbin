import { LatLngTuple } from "leaflet";
import React, { FC, MouseEventHandler } from "react";
import { MapContainer } from "react-leaflet";
import MapContent from "./MapContent";
type Props = {
  admin?: boolean;
  handleDelete?: (id: number) => void;
};
export default function Map({ admin, handleDelete }: Props) {
  const position: LatLngTuple = [46, 25];
  return (
    <MapContainer
      center={position}
      zoom={6}
      style={{ height: "400px", width: "100%" }}
    >
      <MapContent admin={admin} handleDelete={handleDelete} />
    </MapContainer>
  );
}
