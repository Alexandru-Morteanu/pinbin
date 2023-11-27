import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MenuBar from "./components/menubar";
import Footer from "./components/footer";
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
