"use client";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { usePathname } from "next/navigation";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideNavbar = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  return (
    <html lang="en">
      <body>
        {!hideNavbar && <Navbar />}
        {children}
      </body>
    </html>
  );
}


export default RootLayout;