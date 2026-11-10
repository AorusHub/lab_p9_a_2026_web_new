"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const menus = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav>
      <h2>MyPortfolio</h2>

      <ul>
        {menus.map((menu) => {
          const isActive =
            menu.path === "/"
              ? pathname === "/"
              : pathname.startsWith(menu.path);

          return (
            <li key={menu.path}>
              <Link
                href={menu.path}
                style={{
                  color: isActive ? "#2563eb" : "#1f2937",
                  fontWeight: isActive ? "bold" : "normal",
                  textDecoration: "none",
                }}
              >
                {menu.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}