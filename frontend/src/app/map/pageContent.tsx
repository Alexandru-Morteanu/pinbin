"use client";
import { useState } from "react";
import Camera from "../components/camera";
import MapContainer from "../components/map";
import { STATES } from "../../../constants";
import RootLayout from "../layout";
import MapContainer2 from "../components/map";

export default function PageContent() {
  const [currentState, setCurrentState] = useState<string>(STATES.BUTTON);
  const [imgName, setImgName] = useState<string>("");

  const [image, setImage] = useState<string | null>(null);
  const switchState = (state: string) => {
    setCurrentState(state);
  };

  return (
    <>
      {(() => {
        switch (currentState) {
          case STATES.BUTTON:
            return (
              <>
                <p className="m-10 text-2xl font-bold text-center">
                  Press on the button below to send an image of the trash
                </p>
                <button
                  onClick={() => {
                    switchState(STATES.CAMERA);
                  }}
                  className="bg-green-700 hover:bg-green-600 p-10 text-white font-bold  xl:text-9xl text-5xl  rounded-full shadow-lg transform hover:scale-105 transition-transform duration-200 ease-in-out"
                >
                  Pin Bin 🌲
                </button>
              </>
            );
          case STATES.CAMERA:
            return (
              <Camera
                setImgName={setImgName}
                image={image}
                setImage={setImage}
                switchState={switchState}
              />
            );
          case STATES.MAP:
            return <MapContainer2 imgName={imgName} image={image} />;
          default:
            return null;
        }
      })()}
    </>
  );
}
