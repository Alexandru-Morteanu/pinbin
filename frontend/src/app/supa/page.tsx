"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { supabase } from "../components/supabase";
import axiosInstance from "../components/axios";

export default function page() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [arrayBuffer, setArrayBuffer] = useState<ArrayBuffer | undefined>();

  useEffect(() => {
    getAll();
  }, []);

  async function getAll() {
    const { data, error } = await supabase.from("Gunoaie").select("*");
    console.log(data);
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      if (file.type === "image/png") {
        setSelectedFile(file);
      } else {
        alert("Please select a valid PNG file.");
      }
    }
  };
  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      const reader2 = new FileReader();
      reader2.onload = (event: any) => {
        const img = new Image();
        img.onload = () => {
          const width = img.width;
          const height = img.height;

          console.log(`Image Width: ${width}px, Height: ${height}px`);
        };

        img.src = event.target?.result as string;
      };
      reader.onload = (event: any) => {
        const result = event.target?.result;
        if (result instanceof ArrayBuffer) {
          setArrayBuffer(result);
        }
      };

      reader.readAsArrayBuffer(selectedFile);
      reader2.readAsDataURL(selectedFile);
    }
  }, [selectedFile]);

  useEffect(() => {
    if (arrayBuffer) {
      verifyImg();
      console.log(arrayBuffer);
    }
  }, [arrayBuffer]);

  async function verifyImg() {
    let uint8Array: Uint8Array | undefined;

    if (arrayBuffer !== undefined) {
      // Convert the image data to an array of integers
      uint8Array = new Uint8Array(arrayBuffer);
    }

    if (uint8Array) {
      const res = await axiosInstance.post("/", {
        buffer: Array.from(uint8Array) as number[],
      });
      console.log(res.data);
    }
  }

  return (
    <div>
      <input type="file" accept="image/png" onChange={handleFileChange} />
      {selectedFile && (
        <div>
          <p>Selected File: {selectedFile.name}</p>
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "200px" }}
          />
        </div>
      )}
    </div>
  );
}
