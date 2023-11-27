"use client";
import Link from "next/link";
import { useState } from "react";

const MenuBar = () => {
  const [openNav, setOpenNav] = useState<boolean>(false);
  return (
    <div className="fixed flex text-white w-full bg-black bg-opacity-40 z-50 backdrop-blur-lg font-serif">
      <div className="flex justify-between w-full">
        <Link href="/">
          <h1 className="text-white items-center font-bold text-3xl p-4">
            🌍 PinBin<span className="text-green-800">.</span>
          </h1>
        </Link>
        <button
          onClick={() => {
            setOpenNav(!openNav);
          }}
          className="sm:hidden flex items-center p-5 z-50"
        >
          <div className="h-5 w-7 bg-transparent flex flex-col justify-between items-center cursor-pointer opacity-80 transition-all duration-500">
            <div className="w-full h-1 bg-white rounded-full"></div>
            <div className="w-full h-1 bg-white rounded-full"></div>
          </div>
        </button>
        <div
          className={`sm:hidden flex flex-col w-3/8 h-screen bg-black bg-opacity-[40%] mt-16 absolute right-0 transform transition-transform duration-500 ${
            openNav ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {[
            { text: "About", link: "/about" },
            { text: "Locations", link: "/map" },
            { text: "Sponsors", link: "/sponsors" },
          ].map((button, index) => (
            <Link key={index} href={button.link}>
              <p className="px-3 py-2 border-white hover:text-green-600 font-serif text-2xl font-semibold">
                {button.text}
              </p>
            </Link>
          ))}
        </div>
        <div className="sm:flex hidden items-center">
          {[
            { text: "About", link: "/about" },
            { text: "Locations", link: "/map" },
            { text: "Sponsors", link: "/sponsors" },
          ].map((button, index) => (
            <Link key={index} href={button.link}>
              <p className="px-3 py-2 border-white hover:text-green-600 font-serif text-2xl font-semibold">
                {button.text}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
