"use client";

import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import axiosInstance from "../components/axios";
import { STATES } from "../../../constants";
import { supabase } from "./supabase";
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

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setImage(imageSrc || null);
    console.log(imageSrc);

    if (imageSrc) {
      const base64Data = imageSrc.replace(/^data:image\/jpeg;base64,/, "");
      const binaryData = atob(base64Data);
      const uint8Array = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
      }
      console.log(uint8Array);
      captur(uint8Array, imageSrc);
    }
  }, [webcamRef]);

  async function captur(uint8Array: Uint8Array, imageSrc: any) {
    console.log(Array.from(uint8Array) as number[]);
    const res = await axiosInstance.post("/", {
      buffer: Array.from(uint8Array) as number[],
    });
    console.log(res.data);
    if (res.data === "True") {
      const { data, error } = await supabase.storage
        .from("Imagini")
        .upload(`image-${Date.now()}.jpg`, imageSrc, {
          contentType: "image/jpg",
        });
      switchState(STATES.MAP);
      setImgName(`image-${Date.now()}.jpg`);
    }
    console.log(res);
  }

  return (
    <div className=" flex sm:flex-row flex-col items-center justify-center bg-black rounded-lg">
      <div className="flex flex-col sm:border-r-[4px] sm:border-r-black">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="rounded-tl-lg rounded-tr-lg"
        />
        <button
          onClick={capture}
          className="m-2 bg-red-600 focus:bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Capture Photo
        </button>
      </div>
      {image && (
        <>
          <p>{"=>"}</p>
          <div className="sm:border-l-[4px] sm:border-l-black  flex flex-col">
            <img
              src={image}
              alt="Captured"
              className="rounded-tl-lg rounded-tr-lg"
            />
            <button className="m-2 bg-red-600 focus:bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Preview Photo
            </button>
          </div>
        </>
      )}
    </div>
  );
}
