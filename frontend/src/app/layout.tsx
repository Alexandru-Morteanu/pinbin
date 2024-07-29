import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MenuBar from "./components/MenuBar";
import Footer from "./components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PinBin",
  description: "See it. Say it. Sort it.",
};

export default function RootLayout({
  children,
  centerItems = true,
}: {
  children: React.ReactNode;
  centerItems?: boolean;
}) {
  if (centerItems) {
    return (
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Asap:ital,wght@1,600&family=Inter:wght@100..900&family=League+Spartan:wght@500&family=Noto+Serif:wght@500&family=Pacifico&family=Playwrite+BE+VLG:wght@100..400&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
            crossOrigin=""
          />
        </head>
        <body className={inter.className}>
          <MenuBar />
          <main
            className={`flex flex-col items-center ${
              centerItems ? "items-center" : ""
            } min-h-screen`}
          >
            {children}
          </main>
          <Footer />
        </body>
      </html>
    );
  } else {
    return <>{children}</>;
  }
}
