
import TablaEnviarRecibos from "./components/TablaEnviarRecibos";

interface ResumenRecibo {
    PERIODO: number;
    FECHAPAGO: string;
    PERCEPCIONES: number;
    DEDUCCIONES: number;
    NETO: number;
}

export const metadata = {
  title: 'INJUVE - Sistema Integral de Recursos Humanos -  Enviar Recibos de Nómina',
  keywords: ['INJUVE', 'Recibos de Nómina', 'Enviar Recibos', 'Sistema Integral de Recursos Humanos'],
  description: 'Enviar Recibos de Nómina',
};

export default async function EnviarRecibosPage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}nomina/resumen/1`, {
        cache: "no-store",
    });
    const data = await res.json();
    const resumen: ResumenRecibo[] = Array.isArray(data) ? data : [data];

    return (
        <div>
            <div className="flex items-center justify-center">
                <h1 className="text-2xl font-bold">Enviar Recibos de Nómina</h1>
            </div>

            <div className="overflow-x-auto max-w-3xl mx-auto px-4">
                <TablaEnviarRecibos resumen={resumen}  />
            </div>
        </div>
    );
}