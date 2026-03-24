import TablaTimbrado from "./components/TablaTimbrado";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


interface ResumenRecibo {
  PERIODO: number;
  FECHAPAGO: string;
  PERCEPCIONES: number;
  DEDUCCIONES: number;
  NETO: number;
}

export const metadata = {
  title: 'INJUVE - Sistema Integral de Recursos Humanos',
  description: 'Consulta de Timbrado de Recibos de Nómina',
};

export default async function TimbradoPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Acceso no autorizado</h1>
      </div>
    );
  }

  const token = (session.user as any).token as string;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}nomina/resumen/2`, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  const resumen: ResumenRecibo[] = Array.isArray(data) ? data : [data];

  return (
    <div>
      <h1 className="text-2xl font-bold flex items-center justify-center ">Timbrado de Periodos de Nómina</h1>
      <h2 className="text-lg font-semibold text-[#6e1e2a] my-4 flex items-center justify-center">Resumen de Periodos</h2>
      <div className="overflow-x-auto max-w-3xl mx-auto px-4">
        <TablaTimbrado  />
      </div>
    </div>
  );
}