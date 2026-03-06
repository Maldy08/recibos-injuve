"use client";

import { useState, useEffect } from "react";
import { Categoria } from "@/app/domain/entities/categoria";
import { CategoriasRepository } from "@/app/infrastructure/repositories/categorias.repository";
import { LuPlus, LuRefreshCw } from "react-icons/lu";
import CategoriasTable from "./components/CategoriasTable";
import CategoriaFormModal from "./components/CategoriaFormModal";

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [currentCategoria, setCurrentCategoria] = useState<Categoria | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchCategorias = async () => {
    try {
      setLoading(true);
      const data = await CategoriasRepository.getAll();
      setCategorias(data);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      alert("Error al cargar las categorías. Por favor intente de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, [refreshKey]);

  const handleCreate = async (categoria: Categoria) => {
    try {
      setModalLoading(true);
      await CategoriasRepository.create(categoria);
      setIsModalOpen(false);
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error al crear categoría:", error);
      alert("Error al crear la categoría. Verifique que el código no exista.");
    } finally {
      setModalLoading(false);
    }
  };

  const handleUpdate = async (categoria: Categoria) => {
    try {
      setModalLoading(true);
      // Actualizamos descripción y sueldo
      await CategoriasRepository.update(
        categoria.CATEGORIA,
        categoria.DESCRIPCION,
        categoria.SUELDO
      );
      setIsModalOpen(false);
      setCurrentCategoria(null);
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error al actualizar categoría:", error);
      alert("Error al actualizar la categoría.");
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true); // Opcional: mostrar loading global o local
      await CategoriasRepository.delete(id);
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
      alert("Error al eliminar la categoría.");
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setCurrentCategoria(null);
    setIsModalOpen(true);
  };

  const openEditModal = (categoria: Categoria) => {
    setCurrentCategoria(categoria);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Catálogo de Categorías
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Administra las categorías y niveles salariales.
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
            Nueva Categoría
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1">
        {loading && categorias.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <CategoriasTable
            categorias={categorias}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        )}
      </div>

      {isModalOpen && (
        <CategoriaFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={currentCategoria ? handleUpdate : handleCreate}
          initialData={currentCategoria}
          isLoading={modalLoading}
        />
      )}
    </div>
  );
}
