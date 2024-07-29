"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import logo from "../../../public/Logo.png";
import Image from "next/image";

export default function MenuBar() {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const pathname = usePathname();

  return (
    <div className="fixed flex w-full z-[60] bg-white px-2 shadow-md">
      <div className="flex justify-between w-full items-center">
        <Link href="/">
          <Image src={logo} alt="logo" height={50} className="m-2" />
        </Link>
        {/* Hide the mobile menu button for /map and /admin routes */}
        {pathname !== "/map" && pathname !== "/admin" && (
          <button
            onClick={() => setOpenNav(!openNav)}
            className="sm:hidden p-5 z-50 relative focus:outline-none"
          >
            <div className="relative h-5 w-7">
              <div
                className={`h-1 w-7 bg-black rounded-full absolute top-0 transition-transform duration-500 ease-in-out ${
                  openNav ? "rotate-45 translate-y-2.5" : ""
                }`}
              ></div>
              <div
                className={`h-1 w-7 bg-black rounded-full absolute top-2.5 transition-transform duration-500 ease-in-out ${
                  openNav ? "opacity-0" : ""
                }`}
              ></div>
              <div
                className={`h-1 w-7 bg-black rounded-full absolute top-5 transition-transform duration-500 ease-in-out ${
                  openNav ? "-rotate-45 -translate-y-2.5" : ""
                }`}
              ></div>
            </div>
          </button>
        )}
        <div
          className={`sm:hidden fixed top-0 right-0 h-screen bg-white transition-transform duration-500 ${
            openNav ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="pt-20 px-5">
            {/* Hide mobile menu items for /map and /admin routes */}
            {pathname === "/map" || pathname === "/admin"
              ? null
              : [
                  { text: "About", link: "/about" },
                  { text: "Locations", link: "/map" },
                  { text: "Sponsors", link: "/sponsors" },
                  { text: "Sesizari", link: "/sesizari" },
                ].map((button, index) => (
                  <Link key={index} href={button.link}>
                    <p className="px-3 py-2 border-white hover:bg-gray-200 text-2xl font-inter rounded-md transition-colors duration-200 cursor-pointer">
                      {button.text}
                    </p>
                  </Link>
                ))}
          </div>
        </div>
        <div className="sm:flex hidden items-center">
          {/* Hide desktop menu items for /map and /admin routes */}
          {pathname === "/map" || pathname === "/admin"
            ? null
            : [
                { text: "About", link: "/about" },
                { text: "Map", link: "/map" },
                { text: "Sponsors", link: "/sponsors" },
                { text: "Sesizari", link: "/sesizari" },
              ].map((button, index) => (
                <Link key={index} href={button.link}>
                  <p
                    className="px-3 py-2 hover:bg-gray-200 rounded-md transition-colors duration-200 font-inter font-semibold cursor-pointer"
                    style={{ fontWeight: 500 }}
                  >
                    {button.text}
                  </p>
                </Link>
              ))}
        </div>
        {pathname === "/admin" && (
          <div className="flex items-center mt-4 lg:mt-0">
            <button
              type="button"
              className="flex items-center focus:outline-none"
              aria-label="toggle profile dropdown"
            >
              <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                ッ
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
