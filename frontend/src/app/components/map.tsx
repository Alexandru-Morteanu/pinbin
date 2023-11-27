"use client";
import { GoogleMap, LoadScript, InfoBox, Marker } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { Data, PUBLIC_GOOGLE_MAP_KEY } from "../../../constants";
import { supabase } from "./supabase";
import Image from "next/image";
import im from "../sponsors/Inorog.png";
type Props = {
  image: any;
  imgName: string;
};
const MapContainer2 = ({ image, imgName }: Props) => {
  let [userlat, setUserLat] = useState(0);
  let [userlong, setUserLong] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [data, setData] = useState<any | null>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setUserLong(position.coords.longitude);
      setUserLat(position.coords.latitude);
      postCoord(position.coords.latitude, position.coords.longitude);
      getCoord();
    });
  }, []);
  async function postCoord(x: number, y: number) {
    let data: Data = { x: x, y: y, imgName: imgName };
    const res = await supabase.from("Gunoaie").insert([data]);
  }
  async function getCoord() {
    const res = await supabase.from("Gunoaie").select("*");
    setData(res.data);
    getImageUrl(res.data);
  }
  async function getImageUrl(data: any) {
    const urls = [];
    for (const row of data) {
      const { data, error } = await supabase.storage
        .from("Images")
        .download(row.imageName);
      if (error) {
        console.error("Error downloading image:", error.message);
        urls.push("");
      } else {
        const imageBlob = new Blob([data]);
        const imageUrl = URL.createObjectURL(imageBlob);
        urls.push(imageUrl);
      }
    }
    setImageUrls(urls);
  }
  const center = { lat: userlat, lng: userlong };
  return (
    <>
      <LoadScript googleMapsApiKey={PUBLIC_GOOGLE_MAP_KEY}>
        <GoogleMap
          id="map"
          mapContainerStyle={{
            marginTop: "50px",
            height: "90vh",
            width: "100%",
          }}
          zoom={5}
          center={center}
        >
          {data.map((marker: any) => (
            <Marker key={marker.id} position={{ lat: marker.x, lng: marker.y }}>
              <InfoBox>
                <div
                  style={{
                    backgroundColor: "black",
                    opacity: 0.75,
                    padding: "12px",
                    color: "white",
                  }}
                >
                  <img src={marker.image} alt={`Marker ${marker.id}`} />
                </div>
              </InfoBox>
            </Marker>
          ))}
        </GoogleMap>
      </LoadScript>
    </>
  );
};
export default MapContainer2;
