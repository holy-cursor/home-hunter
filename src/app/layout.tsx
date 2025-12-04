import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "aparteh | OAU Student Accommodation",
  description: "Find the best off-campus hostels and apartments near Obafemi Awolowo University (OAU), Ile-Ife. Verified listings for students.",
  keywords: ["OAU", "Obafemi Awolowo University", "Ile-Ife", "Student Housing", "Hostels", "Accommodation", "Off-campus"],
  openGraph: {
    title: "aparteh | OAU Student Accommodation",
    description: "Secure and affordable student housing in Ile-Ife.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={outfit.className}
      >
        {children}
      </body>
    </html>
  );
}
