"use client";
import React, { useRef } from "react";
import Link from "next/link";

const Home: React.FC = () => {
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
      const targetSection = sectionRefs[nextSectionId].current;

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white space-y-16">
      <section
        className="text-center h-screen"
        ref={sectionRefs.section1}
        onClick={() => handleScrollToNextSection("section1")}
      >
        <h1
          className="text-8xl font-bold transition-opacity opacity-0 animate-fadeIn"
          id="content"
        >
          Go <span className="text-green-500">Green</span> with
        </h1>
        <h2 className="text-8xl font-bold">
          <span className="text-white-300">PinBin</span>
        </h2>
        <p className="text-xl font-bold text-gray-200 mt-4">
          Bring together people from all walks of life
          <br />
          to contribute towards a cleaner and healthier planet.
        </p>
        <button
          onClick={() => handleScrollToNextSection("section1")}
          className="px-6 py-3 text-lg font-bold mt-4  text-green-600"
        >
          Learn More
        </button>
        <div id="nec" className="w-full flex justify-center">
          <div
            onClick={() => handleScrollToNextSection("section1")}
            className="cursor-pointer animate-bounce mt-8 p-2 self-center rounded-full bg-[#27272A] border border-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
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
