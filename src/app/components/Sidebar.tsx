"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LuReceipt, LuBellRing, LuUsers, LuCalendarDays, LuBriefcase, LuLayers, LuFolderOpen, LuUserCog } from "react-icons/lu";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";

interface SidebarProps {
  isAdmin?: boolean;
}

export const Sidebar = ({ isAdmin }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [catalogosSubmenuOpen, setCatalogosSubmenuOpen] = useState(false);
  const pathname = usePathname();

  // Auto-abrir submenu si estamos en una ruta de recibos
  useEffect(() => {
    if (pathname.includes('/sirh/recibos')) {
      setSubmenuOpen(true);
    }
  }, [pathname]);

  // Auto-abrir submenu si estamos en una ruta de catálogos
  useEffect(() => {
    if (pathname.includes('/sirh/admin/empleados') || 
        pathname.includes('/sirh/admin/puestos') || 
        pathname.includes('/sirh/admin/categorias') ||
        pathname.includes('/sirh/admin/usuarios')) {
      setCatalogosSubmenuOpen(true);
    }
  }, [pathname]);

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

  // Cerrar sidebar al hacer clic en un enlace (solo móvil)
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay para móviles */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Botón hamburguesa */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 bg-[#2d3748] text-white p-3 rounded-xl shadow-lg hover:bg-[#4a5568] transition-colors duration-200"
          aria-label="Abrir menú"
        >
          <IoMenuOutline className="w-6 h-6" />
        </button>
      )}

      <aside
        className={`fixed top-0 left-0 w-64 h-full bg-gradient-to-b from-[#2d3748] to-[#1a202c] text-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative z-40`}
        aria-label="Sidebar"
      >
        <div className="flex flex-col h-full">
          {/* Header con logo */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <Image
                src="/assets/logo.png"
                alt="Logo INJUVE"
                width={150}
                height={45}
                priority
                className="object-contain"
              />
              {/* Botón cerrar en móviles */}
              {isOpen && (
                <button
                  onClick={() => setIsOpen(false)}
                  className="lg:hidden bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors duration-200"
                  aria-label="Cerrar menú"
                >
                  <IoCloseOutline className="w-5 h-5" />
                </button>
              )}
            </div>

          </div>

          {/* Navegación principal */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {/* Catálogos */}
            {isAdmin && (
              <div>
                <button
                  onClick={() => setCatalogosSubmenuOpen(!catalogosSubmenuOpen)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                    pathname.includes('/sirh/admin/empleados') || 
                    pathname.includes('/sirh/admin/puestos') || 
                    pathname.includes('/sirh/admin/categorias') ||
                    pathname.includes('/sirh/admin/usuarios')
                      ? "bg-white/15 text-white" 
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg transition-colors duration-200 ${
                      pathname.includes('/sirh/admin/empleados') || 
                      pathname.includes('/sirh/admin/puestos') || 
                      pathname.includes('/sirh/admin/categorias') ||
                      pathname.includes('/sirh/admin/usuarios')
                        ? "bg-white/20" 
                        : "bg-white/10 group-hover:bg-white/15"
                    }`}>
                      <LuFolderOpen className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium">Catálogos</span>
                  </span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${catalogosSubmenuOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {catalogosSubmenuOpen && (
                  <div className="ml-6 mt-2 space-y-1 border-l border-white/20 pl-4">
                    {/* Empleados */}
                    <Link
                      href="/sirh/admin/empleados"
                      onClick={handleLinkClick}
                      className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                        pathname === "/sirh/admin/empleados"
                          ? "bg-white/15 text-white font-semibold shadow-lg"
                          : "hover:bg-white/10 text-gray-300 hover:text-white"
                      }`}
                    >
                      <LuUsers className="w-4 h-4" />
                      <span className="text-sm font-medium">Empleados</span>
                    </Link>

                    {/* Puestos */}
                    <Link
                      href="/sirh/admin/puestos"
                      onClick={handleLinkClick}
                      className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                        pathname === "/sirh/admin/puestos"
                          ? "bg-white/15 text-white font-semibold shadow-lg"
                          : "hover:bg-white/10 text-gray-300 hover:text-white"
                      }`}
                    >
                      <LuBriefcase className="w-4 h-4" />
                      <span className="text-sm font-medium">Puestos</span>
                    </Link>

                    {/* Categorías */}
                    <Link
                      href="/sirh/admin/categorias"
                      onClick={handleLinkClick}
                      className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                        pathname === "/sirh/admin/categorias"
                          ? "bg-white/15 text-white font-semibold shadow-lg"
                          : "hover:bg-white/10 text-gray-300 hover:text-white"
                      }`}
                    >
                      <LuLayers className="w-4 h-4" />
                      <span className="text-sm font-medium">Categorías</span>
                    </Link>

                    {/* Usuarios */}
                    <Link
                      href="/sirh/admin/usuarios"
                      onClick={handleLinkClick}
                      className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                        pathname === "/sirh/admin/usuarios"
                          ? "bg-white/15 text-white font-semibold shadow-lg"
                          : "hover:bg-white/10 text-gray-300 hover:text-white"
                      }`}
                    >
                      <LuUserCog className="w-4 h-4" />
                      <span className="text-sm font-medium">Usuarios</span>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* BSS */}
            {isAdmin && (
              <Link
                href="/sirh/admin/bss"
                onClick={handleLinkClick}
                className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                  pathname === "/sirh/admin/bss"
                    ? "bg-white/15 text-white font-semibold shadow-lg"
                    : "hover:bg-white/10 text-gray-300 hover:text-white"
                }`}
              >
                <div className={`p-2 rounded-lg transition-colors duration-200 ${
                  pathname === "/sirh/admin/bss" 
                    ? "bg-white/20" 
                    : "bg-white/10 group-hover:bg-white/15"
                }`}>
                  <LuBellRing className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">BSS</span>
              </Link>
            )}

            {/* Periodos */}
            {isAdmin && (
              <Link
                href="/sirh/admin/periodos"
                onClick={handleLinkClick}
                className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                  pathname === "/sirh/admin/periodos"
                    ? "bg-white/15 text-white font-semibold shadow-lg"
                    : "hover:bg-white/10 text-gray-300 hover:text-white"
                }`}
              >
                <div className={`p-2 rounded-lg transition-colors duration-200 ${
                  pathname === "/sirh/admin/periodos" 
                    ? "bg-white/20" 
                    : "bg-white/10 group-hover:bg-white/15"
                }`}>
                  <LuCalendarDays className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Periodos</span>
              </Link>
            )}

            {/* Recibos */}
            <div>
              <button
                onClick={() => setSubmenuOpen(!submenuOpen)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                  pathname.includes('/sirh/recibos') 
                    ? "bg-white/15 text-white" 
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg transition-colors duration-200 ${
                    pathname.includes('/sirh/recibos') 
                      ? "bg-white/20" 
                      : "bg-white/10 group-hover:bg-white/15"
                  }`}>
                    <LuReceipt className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">Recibos</span>
                </span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${submenuOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {submenuOpen && (
                <div className="ml-6 mt-2 space-y-1 border-l border-white/20 pl-4">
                  <Link
                    href="/sirh/recibos"
                    onClick={handleLinkClick}
                    className={`block px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                      pathname === "/sirh/recibos"
                        ? "bg-white/15 text-white font-medium"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    Mis Recibos
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <div className="text-center">
              <p className="text-white/60 text-xs">
                © {new Date().getFullYear()} INJUVE
              </p>
              <p className="text-white/40 text-xs mt-1">
                v2.0.0
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};