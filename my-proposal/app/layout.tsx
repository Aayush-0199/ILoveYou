import type { Metadata } from "next";
// Import the fonts
import { Poppins, Dancing_Script } from "next/font/google";
import "./globals.css";

// Configure fonts
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
});

export const metadata: Metadata = {
  title: "A Special Question",
  description: "Made with love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Add font variables to the body class */}
      <body className={`${poppins.variable} ${dancingScript.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}