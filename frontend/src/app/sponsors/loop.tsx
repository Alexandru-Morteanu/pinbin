import React from "react";
import "./Carousel.css"; // Create a CSS file for styling

interface Sponsor {
  id: number;
  imageUrl: string;
}

interface SponsorLoopProps {
  sponsors: Sponsor[];
}

const SponsorLoop: React.FC<SponsorLoopProps> = ({ sponsors }) => {
  return (
    <div className="sponsor-container">
      {sponsors.map((sponsor) => (
        <div key={sponsor.id} className="sponsor-item">
          <img src={sponsor.imageUrl} alt={`Sponsor ${sponsor.id}`} />
        </div>
      ))}
    </div>
  );
};

export default SponsorLoop;
