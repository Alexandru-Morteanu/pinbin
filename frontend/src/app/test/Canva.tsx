"use client";
import React, { useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";

const Canva: React.FC = ({ webcamRef }: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const initializeModel = async () => {
      try {
        // Check if WebGL backend is available
        await tf.setBackend("webgl");

        // Load COCO-SSD model
        const net = await cocossd.load();
        console.log("COCO-SSD model loaded.");

        // Start object detection
        setInterval(() => {
          detect(net);
        }, 10);
      } catch (error) {
        console.error("Error initializing TensorFlow:", error);
      }
    };

    initializeModel();
  }, []);

  const detect = async (net: cocossd.ObjectDetection) => {
    if (webcamRef.current?.video?.readyState === 4 && canvasRef.current) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      video.width = videoWidth;
      video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const obj = await net.detect(video);
      console.log("Detection results:", obj);

      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        drawRect(obj, ctx);
      }
    }
  };

  const drawRect = (detections: any[], ctx: CanvasRenderingContext2D) => {
    // Loop through each prediction
    detections.forEach((prediction) => {
      // Extract boxes and classes
      const [x, y, width, height] = prediction.bbox;
      const text = prediction.class;

      // Set styling
      const color = Math.floor(Math.random() * 16777215).toString(16);
      ctx.strokeStyle = "#" + color;
      ctx.font = "18px Arial";

      // Draw rectangles and text
      ctx.beginPath();
      ctx.fillStyle = "#" + color;
      ctx.fillText(text, x, y);
      ctx.rect(x, y, width, height);
      ctx.stroke();
    });
  };

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zIndex: 10,
        width: 640,
        height: 480,
      }}
    />
  );
};

export default Canva;
