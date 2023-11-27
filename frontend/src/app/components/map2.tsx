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
const MapContainer2 = () => {
  const dummyMarkers = [
    {
      id: 1,
      position: { lat: 37.7749, lng: -122.4194 }, // Example coordinates for San Francisco
      image: "https://example.com/image1.jpg", // Replace with your image URLs
    },
    {
      id: 2,
      position: { lat: 24.0522, lng: -118.2437 }, // Example coordinates for Los Angeles
      image: "https://example.com/image2.jpg", // Replace with your image URLs
    },
  ];

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
          center={dummyMarkers[0].position} // Center the map on the first marker
        >
          {dummyMarkers.map((marker) => (
            <Marker key={marker.id} position={marker.position}>
              <InfoBox>
                <div
                  style={{
                    backgroundColor: "black",
                    opacity: 0.75,
                    padding: "12px",
                    color: "white",
                  }}
                >
                  {/* <img src={marker.image} alt={`Marker ${marker.id}`} /> */}
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
