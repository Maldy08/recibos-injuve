import { CatalogConfig } from "./types";

const nivelesFields = [
  { name: "NIVEL", label: "Nivel", required: true, primary: true },
  { name: "SUELDO", label: "Sueldo", required: true },
  { name: "CANASTABASICA", label: "Canasta basica", required: true },
  { name: "BONOTRANSPORTE", label: "Bono transporte", required: true },
  { name: "PREVISIONSOCIAL", label: "Prevision social", required: true },
  { name: "FOMENTOEDUCATIVO", label: "Fomento educativo", required: true },
];

const sueldoPrestacionesFields = [
  { name: "EMPLEADO", label: "Empleado", required: true, primary: true },
  { name: "SUELDOMES", label: "Sueldo mes", required: true },
  { name: "SUELDODIA", label: "Sueldo dia", required: true },
  { name: "CANASTABASICA", label: "Canasta basica", required: true },
  { name: "BONOTRANSPORTE", label: "Bono transporte", required: true },
  { name: "PREVISIONSOCIAL", label: "Prevision social", required: true },
  { name: "FOMENTOEDUCATIVO", label: "Fomento educativo", required: true },
  { name: "QUINQUENIO", label: "Quinquenio", required: true },
  { name: "AGUICATORCENAL", label: "Aguicatorcenal", required: true },
  { name: "SUELDOINTEGRADO", label: "Sueldo integrado", required: true },
];

export const CATALOG_CONFIGS: CatalogConfig[] = [
  {
    id: "niveles",
    endpoint: "niveles",
    title: "Niveles",
    description: "CRUD de niveles con llave primaria NIVEL.",
    primaryKey: "NIVEL",
    fields: nivelesFields,
  },
  {
    id: "nivelesconfianza",
    endpoint: "nivelesconfianza",
    title: "Niveles confianza",
    description: "CRUD de niveles de confianza con llave primaria NIVEL.",
    primaryKey: "NIVEL",
    fields: nivelesFields,
  },
  {
    id: "sueldoprestacionesbase",
    endpoint: "sueldoprestacionesbase",
    title: "Sueldo prestaciones base",
    description: "CRUD de sueldo y prestaciones base con llave primaria EMPLEADO.",
    primaryKey: "EMPLEADO",
    fields: sueldoPrestacionesFields,
  },
  {
    id: "sueldoprestacionesconf",
    endpoint: "sueldoprestacionesconf",
    title: "Sueldo prestaciones confianza",
    description: "CRUD de sueldo y prestaciones confianza con llave primaria EMPLEADO.",
    primaryKey: "EMPLEADO",
    fields: sueldoPrestacionesFields,
  },
];
