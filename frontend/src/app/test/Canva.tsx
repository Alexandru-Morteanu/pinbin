import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import io from "socket.io-client";
import { PointDetails } from "../components/IphoneCamera";

const socket = io("https://python-1gk9.onrender.com");

interface CanvaProps {
  webcamRef: any;
  setLabel: Function;
}

interface Detection {
  object_name: string;
  confidence: number;
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
}

const Canva: React.FC<CanvaProps> = ({ webcamRef, setLabel }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const interval = startSendingFrames();

    socket.on("detection", (message) => {
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
      try {
        const parsedMessage: Detection[] = JSON.parse(message);
        setDetections(parsedMessage);
      } catch (e) {
        console.error("Failed to parse message:", message);
      }
    });

    return () => {
      clearInterval(interval);
      socket.off("detection");
    };
  }, []);

  useEffect(() => {
    if (canvasRef.current && webcamRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Set the new canvas size
      canvas.width = 300;
      canvas.height = 600;

      if (ctx) {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate the scaling factors
        const scaleX = canvas.width / 320;
        const scaleY = canvas.height / 320;

        // Draw detections
        detections.forEach((detection) => {
          setLabel((prevDetails: PointDetails) => ({
            ...prevDetails,
            label: detection.object_name,
          }));
          const { object_name, confidence, xmin, ymin, xmax, ymax } = detection;

          // Scale the coordinates
          const scaledXMin = xmin * scaleX;
          const scaledYMin = ymin * scaleY;
          const scaledXMax = xmax * scaleX;
          const scaledYMax = ymax * scaleY;

          // Draw bounding box
          ctx.strokeStyle = "red";
          ctx.lineWidth = 2;
          ctx.strokeRect(
            scaledXMin,
            scaledYMin,
            scaledXMax - scaledXMin,
            scaledYMax - scaledYMin
          );

          ctx.fillStyle = "red";
          ctx.font = "18px Arial";
          ctx.fillText(
            `${object_name} (${(confidence * 100).toFixed(2)}%)`,
            scaledXMin,
            scaledYMin > 20 ? scaledYMin - 10 : scaledYMin + 20
          );
        });
      }
    }
  }, [detections]);

  const startSendingFrames = () => {
    const interval = setInterval(() => {
      if (webcamRef.current) {
        const frameData = getFrameDataFromWebcam(webcamRef.current);
        if (frameData) {
          socket.emit("frame", frameData);
        }
      }
    }, 2000);

    return interval; // Return the interval ID for cleanup
  };

  const getFrameDataFromWebcam = (webcam: Webcam): number[] | null => {
    const imageSrc = webcam.getScreenshot();
    if (!imageSrc) {
      return null;
    }

    const base64Data = imageSrc.replace(/^data:image\/jpeg;base64,/, "");
    const binaryData = atob(base64Data);
    const uint8Array = new Uint8Array(binaryData.length);

    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }

    // Convert Uint8Array to number[]
    const dataArray = Array.from(uint8Array) as number[];
    return dataArray;
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
        width: 300,
        height: 600,
      }}
    />
  );
};

export default Canva;
