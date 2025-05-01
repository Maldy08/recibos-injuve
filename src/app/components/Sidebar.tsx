'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IoDocumentAttachOutline, IoHomeOutline, IoMenuOutline, IoCloseOutline, IoArrowUp, IoArrowDown, IoPencil } from 'react-icons/io5';

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {/* Botón para abrir el Sidebar en dispositivos móviles */}
            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)} 
                    className="lg:hidden fixed top-24 left-4 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg transition-transform transform hover:bg-green-600"
                >
                    <IoMenuOutline className="w-6 h-6" />
                </button>
            )}

            {/* Sidebar */}
            <aside 
                id="default-sidebar" 
                className={`fixed top-0 left-0 w-64 h-[calc(100vh+50px)] bg-green-800 text-white transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:relative lg:w-64 z-40`} 
                aria-label="Sidebar"
            >
                <div className="relative h-full flex flex-col">
                    {/* Imagen del logo en la parte superior del menú, solo visible en pantallas grandes */}
                    <div className="hidden lg:block">
                        <Image 
                            src="/assets/logo-blanco.png" 
                            alt="logo" 
                            width={225} 
                            height={100} 
                            className="w-full h-auto object-cover" 
                        />
                    </div>

                    {/* Botón de cerrar el menú en la vista móvil */}
                    {isOpen && (
                        <button 
                            onClick={() => setIsOpen(false)} 
                            className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg transition-transform transform hover:bg-red-600 lg:hidden z-50"
                        >
                            <IoCloseOutline className="w-6 h-6" />
                        </button>
                    )}

                    <div className="flex-grow overflow-y-auto px-4 py-6">
                        <ul className="space-y-4 font-medium">
                            <li>
                                <Link href={'/transparencia'} className="flex items-center p-3 rounded-lg transition-transform duration-300 lg:hover:scale-105 lg:hover:bg-green-700">
                                    <IoHomeOutline className="w-6 h-6" />
                                    <span className="ml-4 text-lg">Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={'/transparencia/documentos'} className="flex items-center p-3 rounded-lg transition-transform duration-300 lg:hover:scale-105 lg:hover:bg-green-700">
                                    <IoDocumentAttachOutline className="w-6 h-6" />
                                    <span className="ml-4 text-lg">Recibos de nomina</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>
        </>
    );
};
