"use client";
import { supabase } from "@/app/components/supabase";
import React, { useEffect, useState } from "react";
import MapContent from "../MapContent";
import { MapContainer } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("../Map"), { ssr: false });

function MapAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loged, setLoged] = useState(false);
  const position: LatLngTuple = [46, 25];

  useEffect(() => {
    async function fetchSession() {
      const session = await supabase.auth.getSession();
      if (session.data.session !== null) {
        setLoged(true);
      }
    }
    fetchSession();
  }, []);

  useEffect(() => {
    console.log(loged);
  }, [loged]);

  async function handleDelete(id: number) {
    try {
      await supabase.from("PointsTrash").delete().eq("id", id);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLogin() {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (!error) {
        setLoged(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  async function handleLogout() {
    try {
      const { error } = await supabase.auth.signOut();
      setLoged(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {!loged ? (
        <div className="bg-white p-8 rounded shadow-md text-black">
          <h2 className="text-2xl mb-4">Admin</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        </div>
      ) : (
        <Map admin={true} handleDelete={handleDelete} />
      )}
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default MapAdmin;
