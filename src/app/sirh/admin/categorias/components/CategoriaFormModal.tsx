"use client";

import { useState, useEffect } from "react";
import { Categoria } from "@/app/domain/entities/categoria";
import { LuX } from "react-icons/lu";

interface CategoriaFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (categoria: Categoria) => Promise<void>;
  initialData?: Categoria | null;
  isLoading: boolean;
}

export default function CategoriaFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}: CategoriaFormModalProps) {
  const [formData, setFormData] = useState<Categoria>({
    CATEGORIA: 0,
    DESCRIPCION: "",
    SUELDO: "0",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ CATEGORIA: 0, DESCRIPCION: "", SUELDO: "0" });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const isEditing = !!initialData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">
            {isEditing ? "Editar Categoría" : "Nueva Categoría"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <LuX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Código Categoría (Numérico)
            </label>
            <input
              type="number"
              required
              disabled={isEditing}
              value={formData.CATEGORIA || ""}
              onChange={(e) =>
                setFormData({ ...formData, CATEGORIA: Number(e.target.value) })
              }
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                isEditing
                  ? "bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200"
                  : "border-gray-300"
              }`}
              placeholder="Ej. 10"
            />
            {isEditing && (
              <p className="text-xs text-gray-500 mt-1">
                El código no se puede modificar una vez creado.
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <input
              type="text"
              required
              value={formData.DESCRIPCION}
              onChange={(e) =>
                setFormData({ ...formData, DESCRIPCION: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              placeholder="Ej. Categoría A"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sueldo
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 pointer-events-none">
                $
              </span>
              <input
                type="number"
                step="0.01"
                required
                value={formData.SUELDO}
                onChange={(e) =>
                  setFormData({ ...formData, SUELDO: e.target.value })
                }
                className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-50 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Guardando...
                </>
              ) : (
                "Guardar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
