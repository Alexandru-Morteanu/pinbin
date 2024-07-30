// SponsorPage.tsx
import React from "react";
import Image from "next/image";
import InorogLogo from "./Inorog.png";
import MedfarmLogo from "./medfarm.png";
import NomisLogo from "./Nomis.png";
import InfotrustLogo from "./infotrust.png";
import SortechLogo from "./sortech.png";
import FluxnetLogo from "./fluxnet.png";

const sponsorsData = [
  {
    id: 1,
    name: "Inorog",
    logo: InorogLogo,
    description:
      "Într-o lume în care miraculosul a rămas prins doar în cărțile de poveşti, echipa noastră îşi propune să demonstreze că, doar atunci când crezi în propria magie, poți înfăptui lucruri mărețe.",
  },
  {
    id: 2,
    name: "FluxInternet",
    logo: FluxnetLogo,
    description:
      "Locul 1 in Top Afaceri Romania, localitatea BARLAD, domeniul 62: Activitati de servicii in tehnologia informatiei",
  },
  {
    id: 3,
    name: "MedFarm",
    logo: MedfarmLogo,
    description:
      "Locul 1 in Top Afaceri Romania Microintreprinderi, judetul VASLUI, domeniul 4773: Comert cu amanuntul al produselor farmaceutice, in magazine specializate",
  },
  {
    id: 4,
    name: "InfoTrust",
    logo: InfotrustLogo,
    description:
      "We specialize in online measurement architecture for multi-brand companies, breaking down silos and validating data to ensure organizations can make confident marketing decisions.",
  },
  {
    id: 5,
    name: "SorTech",
    logo: SortechLogo,
    description:
      "Sortech Auto Parts LLC is a leading provider of spare parts for luxury brand vehicles with operations in North America and China. With more than 20 years of industry experiences, Founder & CEO of Sortech is proud to introduce to you the SORTECH brand.",
  },
  {
    id: 6,
    name: "Nomis 2003",
    logo: NomisLogo,
    description:
      "Inalta calificare, experienta angajatilor precum si echipamentele performante specifice lucrarilor de constructii – montaj au permis abordarea unei game largi de lucrari realizate in conditii de calitate deosebite.",
  },
];

const SponsorPage: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Our Sponsors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sponsorsData.map((sponsor) => (
          <div
            key={sponsor.id}
            className="bg-black bg-opacity-40 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            <div className="mb-4">
              <Image src={sponsor.logo} alt={sponsor.name} />
            </div>
            <h2 className="text-xl font-bold mb-2">{sponsor.name}</h2>
            <p className="text-white-700">{sponsor.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SponsorPage;
