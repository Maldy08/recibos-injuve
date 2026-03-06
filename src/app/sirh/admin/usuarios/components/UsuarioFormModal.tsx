"use client";

import { useState, useEffect } from "react";
import { Usuario } from "@/app/infrastructure/repositories/usuarios.repository";
import { LuX, LuEye, LuEyeOff } from "react-icons/lu";

interface UsuarioFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (usuario: Usuario) => Promise<void>;
  initialData?: Usuario | null;
  isLoading: boolean;
}

export default function UsuarioFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}: UsuarioFormModalProps) {
  const [formData, setFormData] = useState<Usuario>({
    EMPLEADO: 0,
    NOMBRE: "",
    CORREO: "",
    PASSWORD: "",
    TIPO: 1,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        PASSWORD: "", // No pre-cargar password por seguridad
      });
    } else {
      setFormData({
        EMPLEADO: 0,
        NOMBRE: "",
        CORREO: "",
        PASSWORD: "",
        TIPO: 1,
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Validar empleado
    if (!formData.EMPLEADO || formData.EMPLEADO <= 0) {
      newErrors.EMPLEADO = "El número de empleado es requerido y debe ser mayor a 0";
    }

    // Validar nombre
    if (!formData.NOMBRE.trim()) {
      newErrors.NOMBRE = "El nombre es requerido";
    }

    // Validar correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.CORREO.trim()) {
      newErrors.CORREO = "El correo es requerido";
    } else if (!emailRegex.test(formData.CORREO)) {
      newErrors.CORREO = "El correo no es válido";
    }

    // Validar password solo si es usuario nuevo o si se está cambiando
    if (!initialData && !formData.PASSWORD) {
      newErrors.PASSWORD = "La contraseña es requerida para usuarios nuevos";
    } else if (formData.PASSWORD && formData.PASSWORD.length < 4) {
      newErrors.PASSWORD = "La contraseña debe tener al menos 4 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Si es edición y no hay password, no enviar el campo PASSWORD
    const dataToSubmit = { ...formData };
    if (initialData && !formData.PASSWORD) {
      delete dataToSubmit.PASSWORD;
    }

    await onSubmit(dataToSubmit);
  };

  const isEditing = !!initialData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">
            {isEditing ? "Editar Usuario" : "Nuevo Usuario"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <LuX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Número de Empleado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número de Empleado <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              required
              disabled={isEditing}
              value={formData.EMPLEADO || ""}
              onChange={(e) => {
                setFormData({ ...formData, EMPLEADO: Number(e.target.value) });
                setErrors({ ...errors, EMPLEADO: "" });
              }}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                isEditing
                  ? "bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200"
                  : errors.EMPLEADO
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Ej. 12345"
            />
            {errors.EMPLEADO && (
              <p className="text-xs text-red-500 mt-1">{errors.EMPLEADO}</p>
            )}
            {isEditing && (
              <p className="text-xs text-gray-500 mt-1">
                El número de empleado no se puede modificar una vez creado.
              </p>
            )}
          </div>

          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Completo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.NOMBRE}
              onChange={(e) => {
                setFormData({ ...formData, NOMBRE: e.target.value });
                setErrors({ ...errors, NOMBRE: "" });
              }}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.NOMBRE ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Ej. Juan Pérez García"
            />
            {errors.NOMBRE && (
              <p className="text-xs text-red-500 mt-1">{errors.NOMBRE}</p>
            )}
          </div>

          {/* Correo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.CORREO}
              onChange={(e) => {
                setFormData({ ...formData, CORREO: e.target.value });
                setErrors({ ...errors, CORREO: "" });
              }}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.CORREO ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Ej. usuario@correo.com"
            />
            {errors.CORREO && (
              <p className="text-xs text-red-500 mt-1">{errors.CORREO}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña {!isEditing && <span className="text-red-500">*</span>}
              {isEditing && <span className="text-gray-500 text-xs">(dejar en blanco para no cambiar)</span>}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required={!isEditing}
                value={formData.PASSWORD}
                onChange={(e) => {
                  setFormData({ ...formData, PASSWORD: e.target.value });
                  setErrors({ ...errors, PASSWORD: "" });
                }}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors pr-10 ${
                  errors.PASSWORD ? "border-red-500" : "border-gray-300"
                }`}
                placeholder={isEditing ? "Nueva contraseña (opcional)" : "Mínimo 4 caracteres"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
              </button>
            </div>
            {errors.PASSWORD && (
              <p className="text-xs text-red-500 mt-1">{errors.PASSWORD}</p>
            )}
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Usuario <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={formData.TIPO}
              onChange={(e) =>
                setFormData({ ...formData, TIPO: Number(e.target.value) })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value={1}>Base</option>
              <option value={2}>Honorarios</option>
            </select>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-50 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
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
