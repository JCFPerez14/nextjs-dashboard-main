"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  if (pathname === "/sign-in" || pathname === "/sign-up") {
    return null;
  }

  return <Navbar />;
}
