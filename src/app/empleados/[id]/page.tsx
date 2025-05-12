'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Empleado {
  VALIDEZ: string;
  EMPLEADO: number;
  APPAT: string;
  APMAT: string;
  NOMBRE: string;
  DEPTO: number;
  CAT: number;
  PROGRAMA: number;
  SUBPROGRAMA: number;
  META: number;
  ACCION: number;
  MPIO: number;
  NIVEL: number;
  PUESTO: number;
  SUELDO: number;
  ESTATUS: string;
  REGIMSS: number;
  CALIMSS: string;
  CTABANCO: number;
  RFC: string;
  homo: string;
  CURP: string;
  FECHAALTA: string;
  FECHANAC: string;
  fechabase: string;
  fechaultmov: string;
  TIPOEMP: string;
  CALLE: string;
  NUMEXT: string;
  NUMINT: string;
  REFERENCIA: string;
  COLONIA: string;
  NOCIUDAD: number;
  CIUDAD: string;
  CODPOS: number;
  NOESTADO: number;
  ESTADO: string;
  TELEFONO: string;
  SEXO: string;
  EDAD: number;
  EDOCIVIL: string;
  CELULAR: string;
  EMAIL: string;
  CREDELECT: string;
  DURACION: number;
  ESCUELA: number;
  CARRERA: number;
  TERMINO: string;
  GRADO: number;
  CALISPT: string;
  SUEANT: number;
  SUERES: number;
  fechamov: string;
  CHECASN: string;
  TURNO: number;
  BANCO: number;
  CHEQUESN: string;
  CLAVEPRESUP: string;
  YASEENVIOTIMBRAR: string;
}

export default function EmpleadoDetalle() {
  const { id } = useParams();
  const [empleado, setEmpleado] = useState<Empleado | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}empleados/${id}`)
        .then(res => res.json())
        .then(data => setEmpleado(data))
        .catch(err => console.error('Error cargando empleado', err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return <div className="text-center mt-8">Cargando datos del empleado...</div>;
  }

  if (!empleado) {
    return <div className="text-center mt-8 text-red-500">Empleado no encontrado.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-[#6e1e2a] text-center">Datos Generales del Empleado</h1>
      
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Datos Personales */}
        <SectionTitle title="Datos Personales" />
        <div></div>

        <InputField label="Número de Empleado" value={empleado.EMPLEADO} />
        <InputField label="Nombre" value={`${empleado.NOMBRE} ${empleado.APPAT} ${empleado.APMAT}`} />
        <InputField label="RFC" value={empleado.RFC} />
        <InputField label="CURP" value={empleado.CURP} />
        <InputField label="Sexo" value={empleado.SEXO} />
        <InputField label="Edad" value={empleado.EDAD} />
        <InputField label="Estado Civil" value={empleado.EDOCIVIL} />
        <InputField label="Correo Electrónico" value={empleado.EMAIL} />
        <InputField label="Celular" value={empleado.CELULAR} />
        <InputField label="Teléfono" value={empleado.TELEFONO} />
        <InputField label="Fecha de Alta" value={empleado.FECHAALTA} />
        <InputField label="Fecha de Nacimiento" value={empleado.FECHANAC} />

        {/* Datos Laborales */}
        <SectionTitle title="Datos Laborales" />
        <div></div>

        <InputField label="Departamento" value={empleado.DEPTO} />
        <InputField label="Puesto" value={empleado.PUESTO} />
        <InputField label="Nivel" value={empleado.NIVEL} />
        <InputField label="Programa" value={empleado.PROGRAMA} />
        <InputField label="Subprograma" value={empleado.SUBPROGRAMA} />
        <InputField label="Meta" value={empleado.META} />
        <InputField label="Acción" value={empleado.ACCION} />
        <InputField label="Sueldo Diario" value={`$${empleado.SUELDO.toFixed(2)}`} />
        <InputField label="Reg. IMSS" value={empleado.REGIMSS} />
        <InputField label="Cuenta Bancaria" value={empleado.CTABANCO} />
        <InputField label="Banco" value={empleado.BANCO} />
        <InputField label="Clave Presupuestal" value={empleado.CLAVEPRESUP} />

        {/* Dirección */}
        <SectionTitle title="Dirección" />
        <div></div>

        <InputField label="Calle" value={empleado.CALLE} />
        <InputField label="Colonia" value={empleado.COLONIA} />
        <InputField label="Ciudad" value={empleado.CIUDAD} />
        <InputField label="Estado" value={empleado.ESTADO} />
        <InputField label="Código Postal" value={empleado.CODPOS} />
      </form>
    </div>
  );
}

// Componente de input para reutilizar
function InputField({ label, value }: { label: string, value: string | number }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1 text-gray-700">{label}</label>
      <input
        type="text"
        value={value}
        readOnly
        className="w-full border rounded-lg px-3 py-2 text-gray-700 bg-gray-100 text-xs focus:outline-none"
      />
    </div>
  );
}

// Componente de título de sección
function SectionTitle({ title }: { title: string }) {
  return (
    <div className="col-span-2 mt-6 mb-2">
      <h2 className="text-md font-bold text-[#383838] border-b pb-1">{title}</h2>
    </div>
  );
}