import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { TablaResumen } from "./components/TablaResumen";


export const metadata = {
    title: 'INJUVE - Sistema Integral de Recursos Humanos',
    description: 'Consulta de Timbrado de Recibos de Nómina',
};


export default async function TimbradoPage() {

    const session = await getServerSession(authOptions);
    if (!session) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">Acceso no autorizado</h1>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold flex items-center justify-center ">Timbrado de Periodos de Nómina</h1>
            <h2 className="text-lg font-semibold text-[#6e1e2a] my-4 flex items-center justify-center">Resumen de Periodos</h2>
            <div className="overflow-x-auto">
                <TablaResumen />
            </div>
        </div>
    );
}