"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import axiosInstance from "./axios";
import { STATES } from "../../../constants";
import { supabase } from "./supabase";
import IphoneCamera from "./IphoneCamera";
import locationWhite from "../images/locwhite.png";
import Image from "next/image";

interface CameraProps {
  switchState: (state: string) => void;
  image: any;
  setImage: Function;
  setImgName: Function;
}
export default function Camera({
  switchState,
  image,
  setImage,
  setImgName,
}: CameraProps) {
  const webcamRef = useRef<Webcam>(null);
  const [location, setLocation] = useState<boolean>(false);
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);

  useEffect(() => {
    const captureLocation = () => {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          setLocation(true);
        },
        function (error) {
          console.error("Error getting location:", error);
          window.alert("Location access is required to use this feature.");
          setLocation(false);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    };

    captureLocation();
  }, []);

  const capture = useCallback(async () => {
    if (location) {
      const imageSrc = webcamRef.current?.getScreenshot();
      setImage(imageSrc || null);
      console.log(lat);
      console.log(lng);
      if (imageSrc) {
        const base64Data = imageSrc.replace(/^data:image\/jpeg;base64,/, "");
        const binaryData = atob(base64Data);
        const uint8Array = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
          uint8Array[i] = binaryData.charCodeAt(i);
        }
        await captur(uint8Array);
      }
    } else {
      alert("TURN ON LOCATION");
    }
  }, [webcamRef, location, lat, lng, setImage]);

  async function captur(uint8Array: Uint8Array) {
    console.log(Array.from(uint8Array) as number[]);
    console.log(lat);
    console.log(lng);
    if (lat && lng && uint8Array) {
      const result = await axiosInstance.post("/", {
        buffer: Array.from(uint8Array) as number[],
      });
      // result.data
      if (true) {
        const newImageName = `image-${Date.now()}.jpg`;
        const res = await axiosInstance.post("/encrypt", {
          x: lat,
          y: lng,
          imgName: newImageName,
        });

        const blob = new Blob([uint8Array], { type: "image/jpeg" });
        const { data, error } = await supabase.storage
          .from("Imagini")
          .upload(newImageName, blob);

        setImgName(newImageName);
        switchState(STATES.MAP);
      } else {
        alert("It's not trash");
      }
    } else {
      alert("TURN ON LOCATION");
    }
  }

  return (
    <div className="flex">
      <IphoneCamera webcamRef={webcamRef} image={image} capture={capture} />
      <Image
        alt="locationWhite"
        src={locationWhite}
        className={`${location ? "opacity-100" : "opacity-20"}`}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}
