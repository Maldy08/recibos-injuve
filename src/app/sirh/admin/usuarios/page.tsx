"use client";

import { useState, useEffect } from "react";
import { Usuario, UsuariosRepository } from "@/app/infrastructure/repositories/usuarios.repository";
import { LuPlus, LuRefreshCw } from "react-icons/lu";
import UsuariosTable from "./components/UsuariosTable";
import UsuarioFormModal from "./components/UsuarioFormModal";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [currentUsuario, setCurrentUsuario] = useState<Usuario | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const data = await UsuariosRepository.getAll();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      alert("Error al cargar los usuarios. Por favor intente de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, [refreshKey]);

  const handleCreate = async (usuario: Usuario) => {
    try {
      setModalLoading(true);
      await UsuariosRepository.create(usuario);
      setIsModalOpen(false);
      setRefreshKey((prev) => prev + 1);
      alert("Usuario creado exitosamente");
    } catch (error: any) {
      console.error("Error al crear usuario:", error);
      const errorMessage = error.response?.data?.message || "Error al crear el usuario. Verifique que el número de empleado no exista.";
      alert(errorMessage);
    } finally {
      setModalLoading(false);
    }
  };

  const handleUpdate = async (usuario: Usuario) => {
    try {
      setModalLoading(true);
      await UsuariosRepository.update(usuario.EMPLEADO, usuario);
      setIsModalOpen(false);
      setCurrentUsuario(null);
      setRefreshKey((prev) => prev + 1);
      alert("Usuario actualizado exitosamente");
    } catch (error: any) {
      console.error("Error al actualizar usuario:", error);
      const errorMessage = error.response?.data?.message || "Error al actualizar el usuario.";
      alert(errorMessage);
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await UsuariosRepository.delete(id);
      setRefreshKey((prev) => prev + 1);
      alert("Usuario eliminado exitosamente");
    } catch (error: any) {
      console.error("Error al eliminar usuario:", error);
      const errorMessage = error.response?.data?.message || "Error al eliminar el usuario.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setCurrentUsuario(null);
    setIsModalOpen(true);
  };

  const openEditModal = (usuario: Usuario) => {
    setCurrentUsuario(usuario);
    setIsModalOpen(true);
  };

  // Filtrar usuarios por término de búsqueda
  const filteredUsuarios = usuarios.filter((usuario) => {
    const search = searchTerm.toLowerCase();
    return (
      usuario.NOMBRE.toLowerCase().includes(search) ||
      usuario.CORREO.toLowerCase().includes(search) ||
      usuario.EMPLEADO.toString().includes(search)
    );
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Gestión de Usuarios
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Administra los usuarios del sistema de recursos humanos.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setRefreshKey((prev) => prev + 1)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            disabled={loading}
          >
            <LuRefreshCw
              size={18}
              className={loading ? "animate-spin" : ""}
            />
            <span className="hidden sm:inline">Actualizar</span>
          </button>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <LuPlus size={18} />
            Nuevo Usuario
          </button>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por empleado, nombre o correo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <UsuariosTable
          usuarios={filteredUsuarios}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      )}

      <UsuarioFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentUsuario(null);
        }}
        onSubmit={currentUsuario ? handleUpdate : handleCreate}
        initialData={currentUsuario}
        isLoading={modalLoading}
      />
    </div>
  );
}
