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
            } min-h-screen text-white bg-gradient-to-br from-gray-900 to-green-800 pt-24 p-6`}
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
