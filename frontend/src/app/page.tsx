"use client";
import React, { useRef } from "react";
import Link from "next/link";
import homepage from "../../public/homepage.png";
import logo from "../../public/Logo.png";
import { useRouter } from "next/navigation";

import Image from "next/image";

const Home: React.FC = () => {
  const router = useRouter();
  const sectionRefs = {
    section1: useRef<HTMLDivElement>(null),
    section2: useRef<HTMLDivElement>(null),
    section3: useRef<HTMLDivElement>(null),
    section4: useRef<HTMLDivElement>(null),
  };

  const handleScrollToNextSection = (sectionId: string) => {
    const sectionKeys = Object.keys(sectionRefs);
    const currentSectionIndex = sectionKeys.findIndex(
      (key) => key === sectionId
    );

    if (currentSectionIndex !== -1) {
      const nextSectionIndex = (currentSectionIndex + 1) % sectionKeys.length;
      const nextSectionId = sectionKeys[nextSectionIndex];
      // @ts-ignore
      const targetSection = sectionRefs[nextSectionId].current;

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-16">
      <section
        className="text-center h-screen mt-10 cursor-pointer"
        ref={sectionRefs.section1}
        onClick={() => {
          router.push("/sesizari");
        }}
      >
        <div className="flex items-center flex-col">
          <Image src={homepage} alt="homepage" height={700} />
          <Image src={logo} alt="logo1" height={40} />
          <div className="text-gray-500">
            Apăsați aici pentru a începe să raportați o problemă din societate
          </div>
        </div>
      </section>

      <section
        className="flex items-center h-screen"
        ref={sectionRefs.section2}
        onClick={() => handleScrollToNextSection("section2")}
      >
        <div className="text-left">
          <div className="font-bold text-green-200 text-8xl">
            Be healthy
            <br />
            Be better
          </div>
          <div className="font-bold text-white text-4xl mt-4 max-w-xl">
            See what will happen if we would recycle trash
            <br />
            and if it would help our planet
          </div>
        </div>
      </section>

      <section
        className="flex items-center h-screen"
        ref={sectionRefs.section3}
        onClick={() => handleScrollToNextSection("section3")}
      >
        <div className="text-center">
          <div className="font-bold text-green-200 text-8xl">
            A new way of living
          </div>
          <div className="font-bold text-white text-4xl mt-4 max-w-full">
            Imagine a day where you can save the planet <br />
            just by opening your phone and taking a photo.
            <br />
            Crazy, right? Nothing is impossible at PinBin!
          </div>
        </div>
      </section>

      <section
        className="h-screen flex items-center justify-center"
        ref={sectionRefs.section4}
        onClick={() => handleScrollToNextSection("section4")}
      >
        <div className="opacity-100 transition-opacity transform translate-y-8 bg-black bg-opacity-70 p-4 rounded-2xl mx-4 text-center">
          <div className="font-bold text-green-100 text-6xl">
            So what are you waiting for?
          </div>
          <div className="font-bold text-white text-4xl">
            Join us and see the world that needs help!
            <br />
            Be the hero you always dreamt you were!
            <br /> Do what is right!
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
