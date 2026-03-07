"use client";

import { useEffect, useMemo, useState } from "react";
import { CatalogConfig, CatalogRecord } from "../types";
import { LuX } from "react-icons/lu";

interface CatalogFormModalProps {
  isOpen: boolean;
  config: CatalogConfig;
  initialData: CatalogRecord | null;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (payload: CatalogRecord) => Promise<void>;
}

type FormValues = Record<string, string>;
type FormErrors = Record<string, string>;

const buildInitialValues = (config: CatalogConfig, row: CatalogRecord | null): FormValues => {
  return config.fields.reduce<FormValues>((acc, field) => {
    const value = row ? row[field.name] : "";
    acc[field.name] = row ? String(value) : "";
    return acc;
  }, {});
};

export default function CatalogFormModal({
  isOpen,
  config,
  initialData,
  isLoading,
  onClose,
  onSubmit,
}: CatalogFormModalProps) {
  const [formValues, setFormValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormErrors>({});

  const isEditing = useMemo(() => Boolean(initialData), [initialData]);

  useEffect(() => {
    if (isOpen) {
      setFormValues(buildInitialValues(config, initialData));
      setErrors({});
    }
  }, [config, initialData, isOpen]);

  if (!isOpen) {
    return null;
  }

  const validate = (): CatalogRecord | null => {
    const nextErrors: FormErrors = {};
    const payload: CatalogRecord = {};

    for (const field of config.fields) {
      const rawValue = (formValues[field.name] ?? "").trim();

      if (field.required && rawValue === "") {
        nextErrors[field.name] = "Este campo es requerido";
        continue;
      }

      const value = Number(rawValue);
      if (!Number.isFinite(value)) {
        nextErrors[field.name] = "Debe ser numerico";
        continue;
      }

      payload[field.name] = value;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return null;
    }

    return payload;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = validate();

    if (!payload) {
      return;
    }

    await onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">
            {isEditing ? `Editar ${config.title}` : `Nuevo registro en ${config.title}`}
          </h2>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <LuX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.fields.map((field) => {
              const disablePrimary = isEditing && field.primary;

              return (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="number"
                    step="any"
                    required={field.required}
                    disabled={disablePrimary || isLoading}
                    value={formValues[field.name] ?? ""}
                    onChange={(e) => {
                      setFormValues((prev) => ({
                        ...prev,
                        [field.name]: e.target.value,
                      }));

                      if (errors[field.name]) {
                        setErrors((prev) => ({ ...prev, [field.name]: "" }));
                      }
                    }}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      disablePrimary
                        ? "bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200"
                        : errors[field.name]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors[field.name] && (
                    <p className="text-xs text-red-500 mt-1">{errors[field.name]}</p>
                  )}
                  {disablePrimary && (
                    <p className="text-xs text-gray-500 mt-1">
                      La llave primaria no se puede editar en actualizacion.
                    </p>
                  )}
                </div>
              );
            })}
          </div>

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
