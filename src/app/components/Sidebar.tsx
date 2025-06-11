"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LuReceipt, LuBellRing } from "react-icons/lu";
import { IoMenuOutline, IoCloseOutline, IoPersonOutline } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";

interface SidebarProps {
  isAdmin?: boolean;
}

export const Sidebar = ({ isAdmin }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed top-6 left-4 z-50 bg-[#383838] text-white p-3 rounded-full shadow-lg hover:bg-[#505050]"
        >
          <IoMenuOutline className="w-6 h-6" />
        </button>
      )}

      <aside
        className={`fixed top-0 left-0 w-64 h-full bg-gradient-to-b from-[#383838] to-[#2b2b2b] text-white shadow-lg transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:relative z-40`}
        aria-label="Sidebar"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6">
            <Image
              src="/assets/logo.png"
              alt="Logo"
              width={200}
              height={60}
              priority
            />
          </div>

          {/* Botón cerrar en móviles */}
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 lg:hidden"
            >
              <IoCloseOutline className="w-6 h-6" />
            </button>
          )}

          {/* Menú */}
          <nav className="flex-1 px-4 space-y-3">
            {isAdmin && (
              <Link
                href="/sirh/admin/empleados"
                className={`group flex items-center gap-4 p-3 rounded-xl transition-all duration-200 ${pathname === "/sirh/admin/empleados"
                  ? "bg-white/10 text-white font-semibold"
                  : "hover:bg-white/10 text-gray-300"
                  }`}
              >
                <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition">
                  <IoPersonOutline className="w-5 h-5" />
                </div>
                <span className="text-base tracking-wide">Empleados</span>
              </Link>
            )}
            {isAdmin && (
              <Link
                href="/sirh/admin/bss"
                className={`group flex items-center gap-4 p-3 rounded-xl transition-all duration-200 ${pathname === "/sirh/admin/bss"
                  ? "bg-white/10 text-white font-semibold"
                  : "hover:bg-white/10 text-gray-300"
                  }`}
              >
                <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition">
                  <LuBellRing className="w-5 h-5" />
                </div>
                <span className="text-base tracking-wide">BSS</span>
              </Link>
            )}
            {/* Periodos */}
            {isAdmin && (
              <Link
                href="/sirh/admin/periodos"
                className={`group flex items-center gap-4 p-3 rounded-xl transition-all duration-200 ${pathname === "/sirh/admin/periodos"
                  ? "bg-white/10 text-white font-semibold"
                  : "hover:bg-white/10 text-gray-300"
                  }`}
              >
                <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition">
                  <LuCalendarDays className="w-5 h-5" />
                </div>
                <span className="text-base tracking-wide">Periodos</span>
              </Link>
            )}

            {/* Recibos */}
            <div>
              <button
                onClick={() => setSubmenuOpen(!submenuOpen)}
                className="w-full flex items-center justify-between p-3 rounded-xl text-gray-300 hover:bg-white/10 transition"
              >
                <span className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition">
                    <LuReceipt className="w-5 h-5" />
                  </div>
                  <span className="text-base">Recibos</span>
                </span>
                <span className="text-sm">{submenuOpen ? "▲" : "▼"}</span>
              </button>
              {submenuOpen && (
                <div className="ml-6 mt-2 space-y-1">
                  <Link
                    href="/sirh/recibos"
                    className={`block px-3 py-2 rounded-md text-sm transition ${pathname === "/sirh/recibos"
                      ? "bg-white/10 text-white font-semibold"
                      : "text-gray-300 hover:bg-white/10"
                      }`}
                  >
                    Mis Recibos
                  </Link>
                  {/* <Link
                    href="/sirh/recibos/enviar-recibos"
                    className={`block px-3 py-2 rounded-md text-sm transition ${
                      pathname === "/sirh/recibos/enviar-recibos"
                        ? "bg-white/10 text-white font-semibold"
                        : "text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    Mandar Recibos
                  </Link> */}
                </div>
              )}
            </div>
          </nav>

        </div>
      </aside>
    </>
  );
};