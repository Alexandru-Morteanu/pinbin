"use client"; // NavigationButton.tsx
import Link from "next/link";
import React, { useState } from "react";

interface NavigationButtonProps {}

const NavigationButton: React.FC<NavigationButtonProps> = () => {
  const [isSquareOpen, setIsSquareOpen] = useState(false);

  const handleButtonClick = () => {
    setIsSquareOpen((prev) => !prev);
  };

  return (
    <div style={{ flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "15vh",
          flexDirection: "row",
          zIndex: 10,
          top: "0",
        }}
      >
        <button
          onClick={handleButtonClick}
          style={{
            color: "white",
          }}
        >
          <div
            style={{
              height: "20px",
              width: "30px",
              background: "transparent",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              flexDirection: "column",
              cursor: "pointer",
              opacity: 0.8,
              transition: "0.5s",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "relative",
                background: "white",
                height: "30%",
                width: "100%",
                borderRadius: "10cm",
              }}
            ></div>
            <div
              style={{
                position: "relative",
                background: "white",
                height: "30%",
                width: "100%",
                borderRadius: "10cm",
              }}
            ></div>
          </div>
        </button>
        {isSquareOpen && (
          <div
            style={{
              transition: "height 0.5s ease-in-out",
              height: "30vh",
              overflow: "hidden",
            }}
            className="text-green-500 text-8xl font-bold"
          >
            <div style={squareStyle}>
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  background: "transparent",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  cursor: "pointer",
                  opacity: 0.8,
                  transition: "0.5s",
                  position: "relative",
                }}
                className={`sm:hidden flex flex-col w-3/8 h-screen bg-black bg-opacity-40 mt-16 absolute right-0 transform transition-transform duration-500 ${
                  isSquareOpen ? "translate-y-0" : "translate-y-full"
                }`}
              >
                <div>Event1</div>
                <div>Event2</div>
                <div>Event3</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const squareStyle: React.CSSProperties = {
  position: "absolute",
  top: "calc(15vh + 40px)", // Adjust the position as needed
  left: "0", // Adjust the position as needed
  width: "100%",
  padding: "5vh",
  display: "flex",
  zIndex: 11,
  flexDirection: "column",
  background: "black",
  opacity: "60%",
  borderRadius: "10px",
};

export default NavigationButton;
