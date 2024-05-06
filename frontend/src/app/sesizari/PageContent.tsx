"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Camera from "../components/Camera";
import { STATES } from "../../../constants";
import dynamic from "next/dynamic";
import "./map.css";

export default function PageContent() {
  const [currentState, setCurrentState] = useState<string>(STATES.BUTTON);
  const [imgName, setImgName] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const switchState = (state: string) => {
    setCurrentState(state);
  };
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    console.log(imgName);
  }, [imgName]);

  useEffect(() => {
    if (isClicked) {
      setTimeout(() => {
        setIsClicked(false);
      }, 1250);
    }
  }, [isClicked]);
  useEffect(() => {
    if (currentState === STATES.MAP) {
      router.push("/map");
    }
  }, [currentState]);
  return (
    <>
      {(() => {
        switch (currentState) {
          case STATES.BUTTON:
            return (
              <div className="w-full flex  flex-col items-center pt-32">
                <p className="m-10 text-2xl font-bold text-center">
                  Press on the button below to send an image of trash
                </p>
                <button
                  className="p-20 bg-green-400 hover:bg-green-500 shadow-4xl text-white font-bold h-16 w-16 rounded-full transform hover:scale-105 transition-transform flex flex-row items-center justify-center border-4 border-solid border-black border-inset"
                  style={{
                    boxShadow: "0px 0px 800px 10px black",
                  }}
                  onClick={() => switchState(STATES.CAMERA)}
                >
                  <div className="text-2xl">📌</div>
                  <div className="text-xl mx-2">PinBin</div>
                  <div className="text-2xl">🗑️</div>
                </button>
              </div>
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
          default:
            return null;
        }
      })()}
    </>
  );
}
