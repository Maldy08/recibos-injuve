import { ChangeEvent, FormEvent, useRef, useState } from "react";

interface Props {
  formato?:string
}

export const useCrearHipervinculo = ({ formato }: Props) => {

  const inputArchivo = useRef<HTMLInputElement>(null);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [src, setSrc] = useState("");
  const [periodo, setPeriodo] = useState(2023);
  const [trimestre, setTrimestre] = useState("Seleccione un trimestre")
  const [error, setError] = useState(false);

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
 const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  if( trimestre == "Seleccione un trimestre") alert('seleccione un trimestre')
  if( formato == "Seleccione un formato"  ) alert('Seleccione un formato')
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
    onFormSubmit,
  };
};
