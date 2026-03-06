"use client";

import { useState, useEffect } from "react";
import { Puesto } from "@/app/domain/entities/puesto";
import { LuX } from "react-icons/lu";

interface PuestoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (puesto: Puesto) => Promise<void>;
  initialData?: Puesto | null;
  isLoading: boolean;
}

export default function PuestoFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}: PuestoFormModalProps) {
  const [formData, setFormData] = useState<Puesto>({
    PUESTO: 0,
    DESCRIPCION: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ PUESTO: 0, DESCRIPCION: "" });
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
            {isEditing ? "Editar Puesto" : "Nuevo Puesto"}
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
              Código Puesto (Numérico)
            </label>
            <input
              type="number"
              required
              disabled={isEditing}
              value={formData.PUESTO || ""}
              onChange={(e) =>
                setFormData({ ...formData, PUESTO: Number(e.target.value) })
              }
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                isEditing
                  ? "bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200"
                  : "border-gray-300"
              }`}
              placeholder="Ej. 123"
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
              placeholder="Ej. Analista Administrativo"
            />
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
