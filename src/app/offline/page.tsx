'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <Image
            src="/assets/logo.png"
            alt="Logo INJUVE"
            width={200}
            height={60}
            className="mx-auto"
            priority
          />
        </div>

        <div className="mb-6">
          <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Sin conexión a Internet
        </h1>
        <p className="text-gray-600 mb-8">
          Parece que no tienes conexión a internet. Verifica tu conexión e intenta
          de nuevo.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-[#6e1e2a] hover:bg-[#5b1823] text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Reintentar conexión
          </button>
          
          <Link
            href="/sirh"
            className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Volver al inicio
          </Link>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="text-left">
              <h3 className="text-sm font-semibold text-blue-800 mb-1">
                ¿Qué puedes hacer sin conexión?
              </h3>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Ver páginas visitadas recientemente (si están en caché)</li>
                <li>• Revisar información guardada anteriormente</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8">
        <p className="text-xs text-gray-400">
          SIRH INJUVE © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}