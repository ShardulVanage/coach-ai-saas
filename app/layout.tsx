import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { NavbarDemo } from "@/components/Nav";
import { ClerkProvider } from "@clerk/nextjs";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CompanionAI",
  description: "Real-time AI Teaching Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} antialiased `}>
        <ClerkProvider>

      <NavbarDemo/>

        {children}
        
        </ClerkProvider>
        </body>
    </html>
  );
}
