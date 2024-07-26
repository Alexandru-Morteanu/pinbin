import React, { ChangeEventHandler } from "react";

type Props = {
  selectedOption: string | undefined;
  handleChange: ChangeEventHandler<HTMLSelectElement>;
};

export default function AdminContent({ selectedOption, handleChange }: Props) {
  return (
    <select
      className=" bg-black rounded-lg"
      value={selectedOption}
      onChange={handleChange}
    >
      <option style={{ background: "orange" }} className="text-black">
        Problem
      </option>
      <option style={{ background: "green" }} className="text-black">
        Solved
      </option>
      <option style={{ background: "red" }} className="text-black">
        AI Mistake
      </option>
    </select>
  );
}
