
export const metadata = {
  title: 'INJUVE - Sistema Integral de Recursos Humanos',
  description: 'Consulta de Recibos de Nómina',
};

export default async function OficiosPage() {
  //redirect('/oficios');


  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Consulta de Recibos de Nómina</h3>

      <div className="mb-6">
        {/* Filtros simulados */}
        <select className="border rounded px-2 py-1 mr-2">
          <option>2025</option>
          <option>2024</option>
        </select>
 
        <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Filtrar</button>
      </div>
    </div>
  );
}