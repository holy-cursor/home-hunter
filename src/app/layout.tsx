import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "House Hunter | OAU Student Accommodation",
  description: "Find the best off-campus hostels and apartments near Obafemi Awolowo University (OAU), Ile-Ife. Verified listings for students.",
  keywords: ["OAU", "Obafemi Awolowo University", "Ile-Ife", "Student Housing", "Hostels", "Accommodation", "Off-campus"],
  openGraph: {
    title: "House Hunter | OAU Student Accommodation",
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
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
