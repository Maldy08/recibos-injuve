import { getServerSession } from "next-auth";
import { TablaEmpleados } from "./components/TablaEmpleados";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata = {
    title: 'INJUVE - Sistema Integral de Recursos Humanos',
    description: 'Consulta de Recibos de Nómina',
};

async function getEmpleados(tipo: number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}empleados/1`, { cache: "no-store" });
    const data = await res.json();
    return Array.isArray(data) ? data : [];
}

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

    const empleados = await getEmpleados(1);

    return (
        <div>
            <h1>Empleados</h1>
            <TablaEmpleados empleados={empleados} tipo={1} />
        </div>
    );
}