import TablaTimbrado from "../../admin/timbrado/components/TablaTimbrado";

interface ResumenRecibo {
    PERIODO: number;
    FECHAPAGO: string;
    PERCEPCIONES: number;
    DEDUCCIONES: number;
    NETO: number;
}

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
                <TablaTimbrado resumen={resumen}  />
            </div>
        </div>
    );
}