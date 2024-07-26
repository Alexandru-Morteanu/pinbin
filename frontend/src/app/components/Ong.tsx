import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { supabase } from "./supabase";
import { DataItem } from "../sesizari/MapContent";

type Props = {
  dataPin: DataItem;
  refresh?: boolean;
  setRefresh: Function;
  setDataPin: Function;
};

export default function Ong({
  dataPin,
  refresh,
  setRefresh,
  setDataPin,
}: Props) {
  const [isChecked, setIsChecked] = useState<boolean>(dataPin.verified);

  const handleCheckboxChange = async (checked: boolean) => {
    setIsChecked(checked);
    setDataPin((prevDataPin: DataItem) => {
      if (prevDataPin) {
        // Return a new object with the updated label
        return {
          ...prevDataPin,
          verified: checked,
        };
      }
      return prevDataPin;
    });
    const { data, error } = await supabase
      .from("PointsTrash")
      .update({ verified: checked })
      .eq("id", dataPin.id);

    if (error) {
      console.error("Error updating Supabase:", error.message);
    } else {
      setRefresh(!refresh);
      console.log("Supabase update successful:", data);
    }
  };

  return (
    <div>
      <Checkbox
        className="border border-solid border-white"
        checked={isChecked}
        onCheckedChange={handleCheckboxChange}
      />{" "}
      Verified
    </div>
  );
}
