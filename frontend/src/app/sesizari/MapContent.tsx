"use client";
import React, {
  Dispatch,
  FC,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { TileLayer, Polygon, Marker, Popup, CircleMarker } from "react-leaflet";
import { useMap, useMapEvent } from "react-leaflet/hooks";
import L, { LatLngExpression, LatLngTuple } from "leaflet";
import runKMeans from "../components/algorithms/kmeans";
import { bigAreaPoints } from "../components/algorithms/maxarea";
import { supabase } from "../components/supabase";
import axiosInstance from "../components/axios";
import yellowIcon from "../images/yellowIcon.png";
import { StaticImageData } from "next/image";
import { Form } from "../components/Blockchain";
import { getStateColor } from "../../../constants";

type Point = {
  x: number;
  y: number;
};

export type DataItem = {
  id: number;
  points: [string, string];
  imgName: string;
  status: string;
  descriere: string;
  name: string;
  label: string;
  detalii_cet: string;
  created_at: string;
  verified: boolean;
};

type Props = {
  admin?: boolean;
  handleDelete?: (id: number) => void;
  setEventLocations?: Function;
  events: Form[];
  setCurrentPin?: Function;
  dataAboutPin?: any;
  searchTerm?: string;
  search?: boolean;
  refresh?: boolean;
};

export function getState(state: string): string {
  switch (state) {
    case "Problem":
      return "text-orange-400";
    case "Solved":
      return "text-green-700";
    case "AI Mistake":
      return "text-red-700";
    default:
      return "";
  }
}

export default function MapContent({
  admin,
  handleDelete,
  setCurrentPin,
  setEventLocations,
  events,
  dataAboutPin,
  searchTerm,
  search,
  refresh,
}: Props) {
  const map = useMap();
  const [polygons, setPolygons] = useState<number[][][]>([]);
  const [circles, setCircles] = useState<any>([]);
  const [zoom, setZoom] = useState<any>(map.getZoom());
  const [data, setData] = useState<DataItem[]>([]);
  const [imageUrl, setImageUrl] = useState<string[] | null>([]);
  const [currentIndex, setCurrentIndex] = useState<number>();
  const [clickedLocation, setClickedLocation] = useState<LatLngTuple | null>(
    null
  );

  function customIcon(iconUrl: StaticImageData) {
    return new L.Icon({
      iconUrl: iconUrl.src || "",
      iconSize: [40, 40],
    });
  }

  useEffect(() => {
    fetchPoints();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const parsedPoints: Point[] = data.map((item) => ({
        x: parseFloat(item.points[0]),
        y: parseFloat(item.points[1]),
      }));

      const clusters = runKMeans(4, parsedPoints);
      // console.log(parsedPoints);
    }
  }, [data]);

  const fetchPoints = async () => {
    try {
      const { data } = await axiosInstance.post("/decrypt");
      setData(data);
    } catch (error: any) {
      console.error("Error fetching points from Supabase:", error.message);
    }
  };

  async function handleReqImage(index: number) {
    setCurrentIndex(index);
    const { imgName } = data[index];
    const { data: imageData, error } = await supabase.storage
      .from("Imagini")
      .download(imgName);
    if (error) {
      console.error("Error downloading image:", error.message);
    } else if (data) {
      const imageUrl = URL.createObjectURL(imageData);
      if (setCurrentPin) setCurrentPin(data[index]);
      setImageUrl((prevImageUrl) => {
        if (Array.isArray(prevImageUrl)) {
          const newImageUrl = [...prevImageUrl];
          newImageUrl[index] = imageUrl;
          return newImageUrl;
        } else {
          return prevImageUrl;
        }
      });
    }
  }

  function isDangerousPoint(point: LatLngTuple): boolean {
    // console.log(point);
    return dataAboutPin.some(
      (dangerousPoint: any) =>
        //@ts-ignore
        parseFloat(dangerousPoint.lat) === parseFloat(point[0]) &&
        //@ts-ignore
        parseFloat(dangerousPoint.lng) === parseFloat(point[1])
    );
  }

  useEffect(() => {
    if (searchTerm !== "") {
      handleSearch();
    }
  }, [search]);

  // useEffect(() => {
  //   handleRefresh();
  // }, [refresh]);

  useMapEvent("click", (event) => {
    const { lat, lng } = event.latlng;
    setClickedLocation([lat, lng]);
    if (setEventLocations) setEventLocations([lat, lng]);
  });

  useMapEvent("zoomend", () => {
    setZoom(map.getZoom());
  });

  // const handleRefresh = async () => {
  //   await fetchPoints();
  //   if (setCurrentPin && currentIndex) await setCurrentPin(data[currentIndex]);
  // };

  const handleSearch = async () => {
    if (!searchTerm) return;
    try {
      const response = await axiosInstance.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchTerm}`
      );
      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        map.setView([lat, lon], 13); // Adjust zoom level as needed
      } else {
        console.error("City not found");
      }
    } catch (error) {
      console.error("Error fetching city location:");
    }
  };

  return (
    <>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {polygons.map((polygon, index) => (
        <Polygon
          key={index}
          pathOptions={{ color: "green" }}
          positions={polygon as LatLngExpression[]}
        />
      ))}
      {dataAboutPin &&
        data?.map((point: any, index) =>
          !point.points.some((value: number) => isNaN(value)) ? (
            <Marker
              key={`circle-${index}`}
              position={point.points}
              eventHandlers={{
                click: () => {
                  handleReqImage(index);
                },
              }}
            >
              <Popup>
                <div>{point.points[0] + " <-> " + point.points[1]}</div>
                <div className={` flex ${getState(point.status)}`}>
                  {" "}
                  {point.status}
                </div>
                {isDangerousPoint(point.points) && (
                  <div className="text-red-600 font-bold">Finished</div>
                )}
                <button className="w-[100%] h-[100px] my-5 justify-center items-center flex p-0 bg-slate-300">
                  <div>
                    {imageUrl && imageUrl[index] && (
                      <img
                        src={imageUrl[index]}
                        alt="Downloaded Image"
                        style={{ maxWidth: "100%" }}
                      />
                    )}
                  </div>
                  {admin && (
                    <div
                      onClick={async () => {
                        handleDelete?.(data[index].id);
                        await fetchPoints();
                      }}
                      className="absolute  right-0 top-7 bg-red-600 rounded-md p-1 h-5 font-bold w-5 m-2 flex justify-center items-center"
                    >
                      -
                    </div>
                  )}
                </button>
              </Popup>
            </Marker>
          ) : null
        )}
      {circles.map((circle: any, index: any) =>
        !circle.center.some((value: number) => isNaN(value)) ? (
          <CircleMarker
            key={`circle-${index}`}
            center={circle.center}
            pathOptions={{ color: "blue", fillColor: "blue" }}
            radius={circle.radius / (40075016.686 / 256 / Math.pow(2, zoom))}
          ></CircleMarker>
        ) : null
      )}
      {clickedLocation && (
        <Marker position={clickedLocation} icon={customIcon(yellowIcon)}>
          <Popup>Clicked Point</Popup>
        </Marker>
      )}
      {events.map((event: any, index) => (
        <Marker
          key={index}
          position={[event.lat, event.lng]}
          icon={customIcon(yellowIcon)}
        >
          <Popup>
            <div>
              <p>Name: {event.name}</p>
              <p>Date: {event.timestamp}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}
