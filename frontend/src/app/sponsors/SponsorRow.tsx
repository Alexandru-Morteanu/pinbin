// SponsorRow.tsx
import React, { useState, useEffect } from "react";
import "./SponsorRow.css"; // Define your styles here

interface Sponsor {
  id: number;
  imageUrl: string;
}

interface SponsorRowProps {
  sponsors: Sponsor[];
  direction: "left" | "right";
}

const SponsorRow: React.FC<SponsorRowProps> = ({ sponsors, direction }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = direction === "left" ? prevIndex - 1 : prevIndex + 1;
        return newIndex < 0 ? sponsors.length - 1 : newIndex % sponsors.length;
      });
    }, 3000); // Change the interval as needed (in milliseconds)

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [direction, sponsors.length]);

  return (
    <div className={`sponsor-row ${direction}`}>
      {sponsors.map((sponsor, index) => (
        <div
          key={sponsor.id}
          className={`carousel-item ${index === currentIndex ? "active" : ""}`}
        >
          <img src={sponsor.imageUrl} alt={`Sponsor ${sponsor.id}`} />
        </div>
      ))}
    </div>
  );
};

export default SponsorRow;
