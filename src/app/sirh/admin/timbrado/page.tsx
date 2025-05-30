import TablaTimbrado from "./components/TablaTimbrado";


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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}nomina/resumen/2`, {
    cache: "no-store",
  });
  const data = await res.json();
  const resumen: ResumenRecibo[] = Array.isArray(data) ? data : [data];

  return (
    <div>
      <h1 className="text-2xl font-bold flex items-center justify-center ">Timbrado de Periodos de Nómina</h1>
      <h2 className="text-lg font-semibold text-[#6e1e2a] my-4 flex items-center justify-center">Resumen de Periodos</h2>
      <div className="overflow-x-auto max-w-3xl mx-auto px-4">
        <TablaTimbrado resumen={resumen} />
      </div>
    </div>
  );
}