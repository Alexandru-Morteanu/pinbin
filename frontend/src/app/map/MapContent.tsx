"use client";
import React, { FC, MouseEventHandler, useEffect, useState } from "react";
import { TileLayer, Polygon, Marker, Popup, CircleMarker } from "react-leaflet";
import { useMap, useMapEvent } from "react-leaflet/hooks";
import L, { LatLngExpression, LatLngTuple } from "leaflet";
import runKMeans from "../components/algorithms/kmeans";
import { bigAreaPoints } from "../components/algorithms/maxarea";
import { supabase } from "../components/supabase";
import axiosInstance from "../components/axios";

type Point = {
  x: number;
  y: number;
};
type Props = {
  admin?: boolean;
  handleDelete?: (id: number) => void;
};

export default function MapContent({ admin, handleDelete }: Props) {
  const map = useMap();
  const [polygons, setPolygons] = useState<number[][][]>([]);
  const [circles, setCircles] = useState<any>([]);
  const [zoom, setZoom] = useState<any>(map.getZoom());
  const [points, setPoints] = useState<[string, string][]>([]);
  const [ids, setIds] = useState<number[]>([]);
  const [imagesArray, setImagesArray] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string[] | null>([]);

  useEffect(() => {
    fetchPoints();
  }, []);

  useEffect(() => {
    if (points.length > 0) {
      const point: Point[] = points.map(([x, y]: [string, string]) => ({
        x: parseFloat(x),
        y: parseFloat(y),
      }));

      const clusters = runKMeans(4, point);
      console.log(point);
      const clusteredPolygons = clusters.map((cluster: any) => {
        const clusterPoints = cluster.points.map((point: any) => ({
          x: point.x,
          y: point.y,
        }));

        const hullPoints: number[][] = bigAreaPoints(
          clusterPoints,
          cluster.centroid
        );
        return hullPoints;
      });
      setPolygons(clusteredPolygons);

      const clusteredCentroids: any = clusters.map((point, index) => {
        const lat = point.centroid.x;
        const lng = point.centroid.y;
        return [lat, lng];
      });

      const circleMarkers = clusters.map((cluster: any, index: number) => {
        const maxRadiusInDegrees = Math.max(
          ...cluster.points.map((point: any) =>
            Math.sqrt(
              Math.pow(cluster.centroid.x - point.x, 2) +
                Math.pow(cluster.centroid.y - point.y, 2)
            )
          )
        );
        const maxRadius = (maxRadiusInDegrees / 360) * 40075016.686;
        const center = clusteredCentroids[index];
        return { center, radius: maxRadius };
      });
      setCircles(circleMarkers);
    }
  }, [points]);

  const fetchPoints = async () => {
    try {
      const { data } = await axiosInstance.post("/decrypt");
      const points = data.map((row: any) => Object.values(row.points));
      const images = data.map((row: any) => row.imgName);
      const iduri = data.map((row: any) => row.id);
      setIds(iduri);
      setPoints(points);
      setImagesArray(images);
    } catch (error: any) {
      console.error("Error fetching points from Supabase:", error.message);
    }
  };

  async function handleReqImage(index: number) {
    const { data, error } = await supabase.storage
      .from("Imagini")
      .download(imagesArray[index]);
    if (error) {
      console.error("Error downloading image:", error.message);
    } else if (data) {
      const imageUrl = URL.createObjectURL(data);
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

  useMapEvent("zoomend", () => {
    setZoom(map.getZoom());
  });

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
      {points?.map((point: any, index) =>
        !point.some((value: number) => isNaN(value)) ? (
          <Marker key={`circle-${index}`} position={point}>
            <Popup>
              {point[0] + " <-> " + point[1]}
              <button
                onClick={() => {
                  handleReqImage(index);
                }}
                className="w-[100%] h-[100px] my-5 justify-center items-center flex p-0 bg-slate-300"
              >
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
                      handleDelete?.(ids[index]);
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
    </>
  );
}
