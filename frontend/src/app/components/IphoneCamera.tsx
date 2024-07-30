import { useState } from "react";
import Webcam from "react-webcam";
import Canva from "../test/Canva";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export type PointDetails = {
  label: string;
  name: string;
  detalii_cet: string;
};
export default function IphoneCamera({ webcamRef, capture, image }: any) {
  const [recording, setRecording] = useState<Boolean>(false);
  const [pointDetails, setPointDetails] = useState<PointDetails>({
    label: "Fara eticheta",
    name: "",
    detalii_cet: "",
  });

  const handleUserMedia = (stream: any) => {
    setRecording(true);
  };
  return (
    <div
      className="text-white w-[300px] h-[600px] bg-blue-900 mt-6 flex flex-col justify-between"
      style={{
        borderRadius: 50,
        boxShadow: "0px 0px 0px 10px rgba(0, 0, 0, 1)",
        overflow: "hidden",
      }}
    >
      {/* <img
        className="w-[300px] h-[500px] absolute bg-yellow-100"
        src={webcamRef}
        style={{
          borderRadius: 50,
        }}
      ></img> */}
      <div className="absolute w-[300px] h-[600px] overflow-hidden z-0">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full h-full absolute top-0 left-0"
          style={{
            borderRadius: 50,
            objectFit: "cover",
            zIndex: 0,
          }}
          onUserMedia={handleUserMedia}
        />
        <Canva setLabel={setPointDetails} webcamRef={webcamRef} />
      </div>
      <div
        className="w-[300px] h-[100px] flex justify-center items-center"
        style={{
          background: "rgb(0,0,20)",
          opacity: 1,
        }}
      >
        <div
          className="absolute w-[300px] h-[100px] bg-black opacity-80"
          style={{
            borderRadius: "50px 50px 0 0",
          }}
        ></div>
        <div
          className="w-[100px] h-[30px] mb-8 bg-black flex justify-center items-center"
          style={{
            borderRadius: 50,
            opacity: 1,
            zIndex: 10,
          }}
        >
          {recording && (
            <div className="bg-green-300 w-[3px] h-[3px] ml-10 rounded-full"></div>
          )}
        </div>
      </div>
      <div className="w-[300px] h-[140px] bg-black opacity-80 flex flex-col justify-between">
        <div className="w-full gap-4 text-xs pt-3">
          <div className="flex items-center justify-center gap-1">
            <div className="w-[50px] flex  justify-center cursor-pointer">
              SLO-MO
            </div>
            <div className="w-[50px] flex  justify-center cursor-pointer">
              Video
            </div>
            <div
              className=" text-yellow-300 text-xl cursor-pointer"
              style={{ fontSize: "1rem" }}
            >
              Photo
            </div>
            <div className="w-[50px] flex  justify-center cursor-pointer">
              Portrait
            </div>
            <div className="w-[50px] flex  justify-center cursor-pointer">
              Pano
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <button
                className="w-[49px] h-[49px] cursor-pointer"
                style={{
                  border: "solid black 2px",
                  borderRadius: "50%",
                  zIndex: "100",
                }}
                disabled={!window.location}
              ></button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] dark text-white">
              <DialogHeader>
                <DialogTitle>Eticheta va fi {pointDetails.label}</DialogTitle>
                <DialogDescription>
                  Aceasta eticheta va fi validata de catre ONG inainte de a
                  ajunge la administrator!
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nume
                  </Label>
                  <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                    onChange={(e: unknown) => {
                      if (
                        e &&
                        typeof e === "object" &&
                        "target" in e &&
                        e.target !== null &&
                        typeof (e.target as any).value === "string"
                      ) {
                        setPointDetails((prevDetails) => ({
                          ...prevDetails,
                          name: (e.target as HTMLInputElement).value,
                        }));
                      }
                    }}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Detalii
                  </Label>
                  <Textarea
                    className="col-span-3"
                    onChange={(e: unknown) => {
                      if (
                        e &&
                        typeof e === "object" &&
                        "target" in e &&
                        e.target !== null &&
                        typeof (e.target as any).value === "string"
                      ) {
                        setPointDetails((prevDetails) => ({
                          ...prevDetails,
                          detalii_cet: (e.target as HTMLInputElement).value,
                        }));
                      }
                    }}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={() => capture(pointDetails)}>
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div
            className="absolute w-[55px] h-[55px] bg-white cursor-pointer"
            style={{
              border: "solid black 2px",
              borderRadius: "50%",
              zIndex: -1,
            }}
          ></div>
          <div className="absolute w-[300px] h-[55px] flex items-center">
            {!image ? (
              <div
                className="w-[37px] h-[37px] bg-red-100 cursor-pointer"
                style={{
                  borderRadius: 5,
                  marginLeft: 35,
                }}
              ></div>
            ) : (
              <img
                src={image}
                alt="Captured"
                className="w-[37px] h-[37px] bg-red-100 cursor-pointer"
                style={{
                  borderRadius: 5,
                  marginLeft: 35,
                }}
              />
            )}
          </div>
        </div>
        <div className="w-full flex items-center justify-center pb-2">
          <div className="w-[108px] h-[5px] bg-white rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
