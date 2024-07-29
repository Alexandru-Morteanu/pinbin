"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Camera from "../components/Camera";
import { STATES } from "../../../constants";
import dynamic from "next/dynamic";
import "./map.css";

export default function PageContent() {
  const [currentState, setCurrentState] = useState<string>(STATES.CAMERA);
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
