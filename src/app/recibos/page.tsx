import { getServerSession } from "next-auth";
import { TablaRecibos } from "./components/TablaRecibos";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: 'INJUVE - Sistema Integral de Recursos Humanos',
  description: 'Consulta de Recibos de Nómina',
};

export default async function RecibosPage() {
  //redirect('/oficios');
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

  console.log("tipo", tipo);


  return (
    <div>
        <div className="overflow-x-auto">
          <TablaRecibos empleado={empleado!} nombre={nombre!} rfc={rfc!} curp={curp!} tipo={tipo!}/>
        </div>

    </div>
  );
}