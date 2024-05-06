import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div
      style={{
        height: "300px",
        width: "300px",
        background: "red",
      }}
    >
      <div
        style={{
          height: "50px",
          width: "50px",
          background: "green",
          margin: "5px",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "end",
          height: "200px",
          width: "200px",
          background: "blue",
          padding: "50px",
        }}
      >
        <div>text</div>
        <div>text2</div>
        <div>text3</div>
      </div>
    </div>
  );
};

export default page;
