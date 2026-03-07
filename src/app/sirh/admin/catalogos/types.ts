export type CatalogId =
  | "niveles"
  | "nivelesconfianza"
  | "sueldoprestacionesbase"
  | "sueldoprestacionesconf";

export interface CatalogField {
  name: string;
  label: string;
  required: boolean;
  primary?: boolean;
}

export interface CatalogConfig {
  id: CatalogId;
  endpoint: string;
  title: string;
  description: string;
  primaryKey: string;
  fields: CatalogField[];
}

export type CatalogRecord = Record<string, number>;
