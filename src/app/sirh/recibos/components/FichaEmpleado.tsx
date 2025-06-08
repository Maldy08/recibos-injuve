import { FaIdBadge, FaHashtag } from "react-icons/fa";
import { MdFingerprint } from "react-icons/md";
import { PiIdentificationCard } from "react-icons/pi";

export const FichaEmpleado = ({ empleado }: {
  empleado: {
    nombre: string;
    numero: number;
    rfc: string;
    curp: string;
  };
}) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 mb-6 border border-gray-200">
      <h2 className="text-xl font-bold text-[#6e1e2a] mb-4">🧾 Datos del empleado</h2>
      
      <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <FaIdBadge className="text-gray-500" />
          <span className="font-semibold">Empleado:</span>
          <span className="truncate">{empleado.nombre}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaHashtag className="text-gray-500" />
          <span className="font-semibold">Número:</span>
          <span>{empleado.numero}</span>
        </div>

        <div className="flex items-center gap-2">
          <MdFingerprint className="text-gray-500" />
          <span className="font-semibold">RFC:</span>
          <span className="font-mono tracking-wide">{empleado.rfc}</span>
        </div>

        <div className="flex items-center gap-2">
          <PiIdentificationCard className="text-gray-500" />
          <span className="font-semibold">CURP:</span>
          <span className="font-mono tracking-wide">{empleado.curp}</span>
        </div>
      </div>
    </div>
  );
};