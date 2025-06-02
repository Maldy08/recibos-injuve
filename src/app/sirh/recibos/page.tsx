import { getServerSession } from "next-auth";
import { TablaRecibos } from "./components/TablaRecibos";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata = {
  title: 'INJUVE - Sistema Integral de Recursos Humanos',
  description: 'Consulta de Recibos de Nómina',
};

async function getRecibos(empleado: number, tipo: number, anio: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}nomina/recibos/${empleado}/${tipo}`, { cache: "no-store" });
  const data = await res.json();
  if (Array.isArray(data)) {
    return data
      .filter((r: any) => r.fechaPago.includes(anio))
      .sort((a: any, b: any) => b.periodo - a.periodo);
  }
  return [];
}

export default async function RecibosPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Acceso no autorizado</h1>
      </div>
    );
  }

  const empleado = session.user?.empleado;
  const nombre = session.user?.name + " " + session.user?.appat + " " + session.user?.apmat;
  const rfc = session.user?.rfc;
  const curp = session.user?.curp;
  const tipo = session.user?.tipo;
  const anio = "2025"; // Puedes obtenerlo de query params o dejarlo fijo

  const recibos = await getRecibos(empleado!, tipo!, anio);

  return (
    <div>
      <div className="overflow-x-auto">
        <TablaRecibos
          empleado={empleado!}
          nombre={nombre!}
          rfc={rfc!}
          curp={curp!}
          tipo={tipo!}
          recibos={recibos}
          anioInicial={anio}
        />
      </div>
    </div>
  );
}