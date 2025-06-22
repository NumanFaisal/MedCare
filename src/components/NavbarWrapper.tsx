'use client'

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

function NavbarWrapper() {
    const pathname = usePathname();

    const hideNavbar = pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/dashboard");

    if (hideNavbar) return null;

    return <Navbar />
}

export default NavbarWrapper;