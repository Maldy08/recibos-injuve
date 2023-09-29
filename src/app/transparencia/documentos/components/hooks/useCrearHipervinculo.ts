import { ChangeEvent, useRef, useState } from "react";

export const useCrearHipervinculo = () => {

  const inputArchivo = useRef<HTMLInputElement>(null);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [src, setSrc] = useState("");
  const [periodo, setPeriodo] = useState(2023);
  const [trimestre, setTrimestre] = useState("Seleccione un trimestre")

  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    setArchivo(event.target.files![0]);
    const regex = new RegExp("[^.]+$");
    const file = event.target.value;
    const extension = file.match(regex);
    setSrc(`/assets/${extension![0].toString()}.png`);
  };

  const handleChangePeriodo = (event: ChangeEvent<HTMLInputElement>) => {
    setPeriodo(+event.target.value);
  };
  const handleChangeTrimestre = (e: ChangeEvent<HTMLSelectElement>) => {
    setTrimestre(e.target.value)
 }

  return {
    inputArchivo,
    archivo,
    setArchivo,
    src,
    setSrc,
    handleChangeFile,
    handleChangePeriodo,
    periodo,
    trimestre,
    handleChangeTrimestre,
  };
};
