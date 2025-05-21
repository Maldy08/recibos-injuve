import { TablaEmpleados } from "../empleados/components/TablaEmpleados";


export const metadata = {
    title: 'INJUVE - Sistema Integral de Recursos Humanos',
    description: 'Consulta de Recibos de Asimilables',
};
const tipo = 2 ;

export default async function AsimilablesPage() {
    return (
        <div>
            <h1>Asimilables</h1>
            <TablaEmpleados tipo={tipo}/>
        </div>
    );
}