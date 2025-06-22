
// import Navbar from "@/components/Navbar";
import "./globals.css";
// import { usePathname } from "next/navigation";
import NavbarWrapper from "@/components/NavbarWrapper";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <NavbarWrapper />
        {children}
      </body>
    </html>
  );
}

export default RootLayout;