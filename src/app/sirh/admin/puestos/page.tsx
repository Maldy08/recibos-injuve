"use client";

import { useState, useEffect } from "react";
import { Puesto } from "@/app/domain/entities/puesto";
import { PuestosRepository } from "@/app/infrastructure/repositories/puestos.repository";
import { LuPlus, LuRefreshCw } from "react-icons/lu";
import PuestosTable from "./components/PuestosTable";
import PuestoFormModal from "./components/PuestoFormModal";

export default function PuestosPage() {
  const [puestos, setPuestos] = useState<Puesto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [currentPuesto, setCurrentPuesto] = useState<Puesto | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchPuestos = async () => {
    try {
      setLoading(true);
      const data = await PuestosRepository.getAll();
      setPuestos(data);
    } catch (error) {
      console.error("Error al obtener puestos:", error);
      alert("Error al cargar los puestos. Por favor intente de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPuestos();
  }, [refreshKey]);

  const handleCreate = async (puesto: Puesto) => {
    try {
      setModalLoading(true);
      await PuestosRepository.create(puesto);
      setIsModalOpen(false);
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error al crear puesto:", error);
      alert("Error al crear el puesto. Verifique que el código no exista.");
    } finally {
      setModalLoading(false);
    }
  };

  const handleUpdate = async (puesto: Puesto) => {
    try {
      setModalLoading(true);
      // Solo enviamos la descripción porque el ID (PUESTO) es inmutable en el backend para PUT
      await PuestosRepository.update(puesto.PUESTO, puesto.DESCRIPCION);
      setIsModalOpen(false);
      setCurrentPuesto(null);
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error al actualizar puesto:", error);
      alert("Error al actualizar el puesto.");
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true); // Opcional: mostrar loading global o local
      await PuestosRepository.delete(id);
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error al eliminar puesto:", error);
      alert("Error al eliminar el puesto.");
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setCurrentPuesto(null);
    setIsModalOpen(true);
  };

  const openEditModal = (puesto: Puesto) => {
    setCurrentPuesto(puesto);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Catálogo de Puestos
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Administra los puestos laborales disponibles en el sistema.
          </p>
        </div>
        <div className="flex gap-2">
            <button
            onClick={() => setRefreshKey((prev) => prev + 1)}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors"
            title="Recargar"
          >
            <LuRefreshCw size={20} />
          </button>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <LuPlus size={18} />
            Nuevo Puesto
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1">
        {loading && puestos.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <PuestosTable
            puestos={puestos}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        )}
      </div>

      {isModalOpen && (
        <PuestoFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={currentPuesto ? handleUpdate : handleCreate}
          initialData={currentPuesto}
          isLoading={modalLoading}
        />
      )}
    </div>
  );
}
