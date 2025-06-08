import TablaTimbrado from "../timbrado/components/TablaTimbrado";

export const metadata = {
  title: 'INJUVE - Sistema Integral de Recursos Humanos',
  description: 'Consulta de Periodos de Nómina',
};

export default function PeriodosPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold flex items-center justify-center">Timbrado de Periodos de Nómina</h1>
      <h2 className="text-lg font-semibold text-[#6e1e2a] my-4 flex items-center justify-center">Resumen de Periodos</h2>
      <div className="overflow-x-auto mx-auto px-4">
        <TablaTimbrado />
      </div>
    </div>
  );
}