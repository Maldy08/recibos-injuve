import { TablaEmpleados } from "./components/TablaEmpleados";


export const metadata = {
    title: 'INJUVE - Sistema Integral de Recursos Humanos',
    description: 'Consulta de Recibos de Nómina',
};

const tipo = 1


export default async function EmpleadosPage() {
    //redirect('/oficios');
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //     return (
    //         <div className="flex items-center justify-center h-screen">
    //             <h1 className="text-2xl font-bold">Acceso no autorizao</h1>
    //         </div>
    //     );
    // }

    return (
        <div>
            <h1>Empleados</h1>
            <TablaEmpleados tipo={1}/>
        </div>
    );
}