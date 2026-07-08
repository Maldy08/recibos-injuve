'use client';

import { useState } from "react";
import { FaIdBadge, FaHashtag } from "react-icons/fa";
import { MdFingerprint } from "react-icons/md";
import { PiIdentificationCard } from "react-icons/pi";
import { LuEye, LuEyeOff } from "react-icons/lu";

export const FichaEmpleado = ({ empleado }: {
  empleado: {
    nombre: string;
    numero: number;
    rfc: string;
    curp: string;
  };
}) => {
  const [showRfc, setShowRfc] = useState(false);
  const [showCurp, setShowCurp] = useState(false);

  const maskValue = (val: string) => {
    if (!val) return "";
    if (val.length <= 4) return "****";
    return val.substring(0, 4) + "•".repeat(val.length - 4);
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-5 mb-6 border border-gray-200 w-full">
      <h2 className="text-xl font-bold text-[#6e1e2a] mb-4">🧾 Datos del empleado</h2>
      
      <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <FaIdBadge className="text-gray-500 flex-shrink-0" />
          <span className="font-semibold flex-shrink-0">Empleado:</span>
          <span className="truncate font-medium">{empleado.nombre}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaHashtag className="text-gray-500 flex-shrink-0" />
          <span className="font-semibold flex-shrink-0">Número:</span>
          <span className="font-medium">{empleado.numero}</span>
        </div>

        <div className="flex items-center justify-between border-t sm:border-t-0 pt-2 sm:pt-0">
          <div className="flex items-center gap-2">
            <MdFingerprint className="text-gray-500 flex-shrink-0" />
            <span className="font-semibold flex-shrink-0">RFC:</span>
            <span className="font-mono tracking-wide bg-gray-50 px-2 py-0.5 rounded border border-gray-100 font-medium">
              {showRfc ? empleado.rfc : maskValue(empleado.rfc)}
            </span>
          </div>
          <button
            onClick={() => setShowRfc(!showRfc)}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
            title={showRfc ? "Ocultar RFC" : "Mostrar RFC"}
            aria-label={showRfc ? "Ocultar RFC" : "Mostrar RFC"}
          >
            {showRfc ? <LuEyeOff className="w-4 h-4" /> : <LuEye className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex items-center justify-between border-t sm:border-t-0 pt-2 sm:pt-0">
          <div className="flex items-center gap-2">
            <PiIdentificationCard className="text-gray-500 flex-shrink-0" />
            <span className="font-semibold flex-shrink-0">CURP:</span>
            <span className="font-mono tracking-wide bg-gray-50 px-2 py-0.5 rounded border border-gray-100 font-medium">
              {showCurp ? empleado.curp : maskValue(empleado.curp)}
            </span>
          </div>
          <button
            onClick={() => setShowCurp(!showCurp)}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
            title={showCurp ? "Ocultar CURP" : "Mostrar CURP"}
            aria-label={showCurp ? "Ocultar CURP" : "Mostrar CURP"}
          >
            {showCurp ? <LuEyeOff className="w-4 h-4" /> : <LuEye className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};