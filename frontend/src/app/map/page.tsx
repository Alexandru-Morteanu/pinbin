"use client";
import React, { useState } from "react";
import Admin from "../admin/Admin";
type Props = {};

export default function page({}: Props) {
  return (
    <div className="w-full">
      <Admin admin={false} />
    </div>
  );
}
