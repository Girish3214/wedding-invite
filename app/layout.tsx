import type { Metadata } from "next";
import { Playfair_Display, Open_Sans, Cookie, Poppins } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-opensans",
  subsets: ["latin"],
});

const cookie = Cookie({
  variable: "--font-cookie",
  weight: "400",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wedding Invite",
  description: "Wedding Invite",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${openSans.variable} ${cookie.variable} ${poppins.variable} antialiased`}
        suppressHydrationWarning={true}
        data-lt-installed="true"
      >
        {children}
      </body>
    </html>
  );
}
