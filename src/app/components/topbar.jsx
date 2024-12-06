"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import "../styles/topbar.css";

export default function Topbar() {
  const [isAdmin, setIsAdmin] = useState(false);

  let path = usePathname();

  const isLogin = path === "/login" || path === "/register" || path === "/";

  const isDashboard = path === "/dashboard" ? "active" : "";
  const isCars = path === "/cars" ? "active" : "";
  const isDrivers = path === "/drivers" ? "active" : "";

  useEffect(() => {
    const isAdminValue = localStorage.getItem("isAdmin");
    if (isAdminValue === "true") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  return !isLogin ? (
    <nav className="topnav">
      <ul>
        <li>
          <Link href="/dashboard" className={isDashboard}>
            Dashboard
          </Link>
        </li>

        {isAdmin && (
          <>
            <li>
              <Link href="/cars" className={isCars}>
                Carros
              </Link>
            </li>
            <li>
              <Link href="/drivers" className={isDrivers}>
                Motoristas
              </Link>
            </li>
          </>
        )}

        <li>
          <Link href="/login">Logout</Link>
        </li>
      </ul>
    </nav>
  ) : null;
}
