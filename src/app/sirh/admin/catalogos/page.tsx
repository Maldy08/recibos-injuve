"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { LuPlus, LuRefreshCw, LuSearch, LuX } from "react-icons/lu";
import { CatalogosRepository } from "@/app/infrastructure/repositories/catalogos.repository";
import { CATALOG_CONFIGS } from "./config";
import { CatalogConfig, CatalogRecord } from "./types";
import CatalogTable from "./components/CatalogTable";
import CatalogFormModal from "./components/CatalogFormModal";
import Toaster, { ToastMessage } from "./components/Toaster";

const TOAST_DURATION_MS = 4500;

const getBackendErrorMessage = (error: unknown, primaryKeyLabel: string) => {
  if (!axios.isAxiosError(error)) {
    return "No se pudo completar la operacion.";
  }

  const status = error.response?.status;
  const apiMessage =
    (typeof error.response?.data?.message === "string" && error.response?.data?.message) ||
    (typeof error.response?.data?.error === "string" && error.response?.data?.error) ||
    "";

  if (status === 400) {
    return apiMessage || `Error de validacion. Verifica campos numericos o llave duplicada (${primaryKeyLabel}).`;
  }

  if (status === 404) {
    return apiMessage || "Registro no encontrado.";
  }

  if (status === 500) {
    return apiMessage || "Error interno del servidor.";
  }

  return apiMessage || "No se pudo completar la operacion.";
};

const normalizeSearchResult = (result: CatalogRecord | CatalogRecord[]) => {
  if (Array.isArray(result)) {
    return result;
  }

  return [result];
};

const buildPutPayload = (payload: CatalogRecord, primaryKey: string) => {
  return Object.keys(payload).reduce<CatalogRecord>((acc, key) => {
    if (key !== primaryKey) {
      acc[key] = Number(payload[key]);
    }

    return acc;
  }, {});
};

const findPrimaryByTabId = (tabId: string) => {
  return CATALOG_CONFIGS.find((item) => item.id === tabId) || CATALOG_CONFIGS[0];
};

export default function CatalogosPage() {
  const [activeTabId, setActiveTabId] = useState(CATALOG_CONFIGS[0].id);
  const [rows, setRows] = useState<CatalogRecord[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [isFilteredResult, setIsFilteredResult] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<CatalogRecord | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const activeConfig: CatalogConfig = useMemo(
    () => findPrimaryByTabId(activeTabId),
    [activeTabId]
  );

  const pushToast = useCallback((type: ToastMessage["type"], text: string) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setToasts((prev) => [...prev, { id, type, text }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((message) => message.id !== id));
    }, TOAST_DURATION_MS);
  }, []);

  const fetchAll = useCallback(async () => {
    try {
      setListLoading(true);
      const data = await CatalogosRepository.getAll(activeConfig.endpoint);
      setRows(Array.isArray(data) ? data : []);
      setIsFilteredResult(false);
    } catch (error) {
      pushToast("error", getBackendErrorMessage(error, activeConfig.primaryKey));
    } finally {
      setListLoading(false);
    }
  }, [activeConfig.endpoint, activeConfig.primaryKey, pushToast]);

  useEffect(() => {
    setSearchValue("");
    setEditingRecord(null);
    setIsModalOpen(false);
    fetchAll();
  }, [activeTabId, fetchAll]);

  const handleRefresh = async () => {
    await fetchAll();
    pushToast("success", `Listado de ${activeConfig.title.toLowerCase()} actualizado.`);
  };

  const handleSearchByPrimary = async (event: React.FormEvent) => {
    event.preventDefault();

    const trimmed = searchValue.trim();
    if (!trimmed) {
      pushToast("error", `Ingresa un ${activeConfig.primaryKey} para buscar.`);
      return;
    }

    const parsedId = Number(trimmed);
    if (!Number.isFinite(parsedId)) {
      pushToast("error", `${activeConfig.primaryKey} debe ser numerico.`);
      return;
    }

    try {
      setSearchLoading(true);
      const data = await CatalogosRepository.getById(activeConfig.endpoint, parsedId);
      setRows(normalizeSearchResult(data));
      setIsFilteredResult(true);
    } catch (error) {
      setRows([]);
      setIsFilteredResult(true);
      pushToast("error", getBackendErrorMessage(error, activeConfig.primaryKey));
    } finally {
      setSearchLoading(false);
    }
  };

  const clearSearch = async () => {
    setSearchValue("");
    await fetchAll();
  };

  const openCreateModal = () => {
    setEditingRecord(null);
    setIsModalOpen(true);
  };

  const openEditModal = (row: CatalogRecord) => {
    setEditingRecord(row);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (!actionLoading) {
      setIsModalOpen(false);
      setEditingRecord(null);
    }
  };

  const handleCreate = async (payload: CatalogRecord) => {
    try {
      setActionLoading(true);
      await CatalogosRepository.create(activeConfig.endpoint, payload);
      pushToast("success", "Registro creado exitosamente.");
      setIsModalOpen(false);
      setEditingRecord(null);
      await fetchAll();
    } catch (error) {
      pushToast("error", getBackendErrorMessage(error, activeConfig.primaryKey));
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdate = async (payload: CatalogRecord) => {
    if (!editingRecord) {
      return;
    }

    const rowId = Number(editingRecord[activeConfig.primaryKey]);

    try {
      setActionLoading(true);
      const putPayload = buildPutPayload(payload, activeConfig.primaryKey);
      await CatalogosRepository.update(activeConfig.endpoint, rowId, putPayload);
      pushToast("success", "Registro actualizado exitosamente.");
      setIsModalOpen(false);
      setEditingRecord(null);

      if (isFilteredResult) {
        setRows([{ ...payload, [activeConfig.primaryKey]: rowId }]);
      } else {
        await fetchAll();
      }
    } catch (error) {
      pushToast("error", getBackendErrorMessage(error, activeConfig.primaryKey));
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setActionLoadingId(id);
      await CatalogosRepository.remove(activeConfig.endpoint, id);
      pushToast("success", "Registro eliminado exitosamente.");

      if (isFilteredResult) {
        setRows((prev) => prev.filter((row) => Number(row[activeConfig.primaryKey]) !== id));
      } else {
        await fetchAll();
      }
    } catch (error) {
      pushToast("error", getBackendErrorMessage(error, activeConfig.primaryKey));
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Toaster messages={toasts} />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Modulo de Catalogos</h1>
          <p className="text-gray-500 mt-1 text-sm">
            CRUD para niveles, nivelesconfianza, sueldoprestacionesbase y sueldoprestacionesconf.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleRefresh}
            disabled={listLoading || searchLoading || actionLoading}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            <LuRefreshCw size={18} className={listLoading ? "animate-spin" : ""} />
            Recargar
          </button>

          <button
            onClick={openCreateModal}
            disabled={actionLoading}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50"
          >
            <LuPlus size={18} />
            Nuevo registro
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200 mb-4 overflow-x-auto">
        <div className="flex min-w-max gap-2 pb-2">
          {CATALOG_CONFIGS.map((tab) => {
            const isActive = tab.id === activeTabId;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.title}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">{activeConfig.description}</p>
      </div>

      <form onSubmit={handleSearchByPrimary} className="mb-6 flex flex-col sm:flex-row gap-2">
        <input
          type="number"
          step="1"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder={`Buscar por ${activeConfig.primaryKey}`}
          className="w-full sm:max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
        <button
          type="submit"
          disabled={searchLoading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {searchLoading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <LuSearch size={16} />
          )}
          Buscar
        </button>
        {isFilteredResult && (
          <button
            type="button"
            onClick={clearSearch}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <LuX size={16} />
            Limpiar
          </button>
        )}
      </form>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1">
        {listLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          </div>
        ) : (
          <CatalogTable
            config={activeConfig}
            rows={rows}
            actionLoadingId={actionLoadingId}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        )}
      </div>

      <CatalogFormModal
        isOpen={isModalOpen}
        config={activeConfig}
        initialData={editingRecord}
        isLoading={actionLoading}
        onClose={closeModal}
        onSubmit={editingRecord ? handleUpdate : handleCreate}
      />
    </div>
  );
}



