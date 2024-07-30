// src/app/layout.tsx

import type { ReactNode } from "react";
import MenuBar from "./components/MenuBar";
import Footer from "./components/Footer";
import "./globals.css";

interface RootLayoutProps {
  children: any;
  // centerItems?: any;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>{/* head content */}</head>
      <body>
        <MenuBar />
        <main
        // className={`flex flex-col ${
        //   centerItems ? "items-center" : ""
        // } min-h-screen`}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
