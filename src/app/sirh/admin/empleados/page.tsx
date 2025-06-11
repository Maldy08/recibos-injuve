import { getServerSession } from "next-auth";
import { TablaEmpleados } from "./components/TablaEmpleados";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata = {
    title: 'INJUVE - Sistema Integral de Recursos Humanos',
    description: 'Consulta de Recibos de Nómina',
};
export default async function EmpleadosPage() {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (user !== undefined && user?.admin !== 1) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">Acceso no autorizado</h1>
            </div>
        );
    }


    return (
        <div>
                  <h2 className="text-lg font-semibold text-[#6e1e2a] my-4 flex items-center justify-center">Listado de empleados</h2>
            <TablaEmpleados />
        </div>
    );
}