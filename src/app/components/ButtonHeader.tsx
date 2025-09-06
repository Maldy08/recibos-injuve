'use client';

import { useState, useRef, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { FaUserCircle } from 'react-icons/fa';

interface ButtonHeaderProps {
  user: string;
}

export const ButtonHeader = ({ user }: ButtonHeaderProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cierra el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-medium text-white hover:text-gray-300 focus:outline-none transition-colors duration-200 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg"
      >
        <FaUserCircle className="text-lg lg:text-xl flex-shrink-0" />
        <span className="hidden sm:inline truncate max-w-[150px] lg:max-w-[200px]">{user}</span>
        <svg 
          className={`w-3 h-3 lg:w-4 lg:h-4 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          {/* Overlay para cerrar en móviles */}
          <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setOpen(false)} />
          
          <div className="absolute right-0 mt-2 w-48 lg:w-56 bg-white text-gray-800 rounded-lg shadow-xl ring-1 ring-black/10 z-50 border border-gray-200">
            <div className="p-3 border-b border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Usuario</p>
              <p className="text-sm font-medium text-gray-900 truncate">{user}</p>
            </div>
            <div className="py-1">
              <button
                onClick={() => signOut({ callbackUrl: '/logout' })}
                className="flex items-center w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Cerrar sesión
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};