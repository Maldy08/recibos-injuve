import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { deleteBitacora, postBitacoras } from "../actions/client/bitacoras-action";
import { Bitacoras } from "@/interfaces";

interface Props {
  formato?: string;
  idusuario: number;
  setBitacorasResponse: (data: Bitacoras[]) => void;
  idbitacora:number;

  
}

export const useCrearHipervinculo = ({
  formato,
  idusuario,
  setBitacorasResponse,
  idbitacora,
}: Props) => {
  const inputArchivo = useRef<HTMLInputElement>(null);
  const [archivo, setArchivo] = useState<Array<File> | null>(null);
  const [periodo, setPeriodo] = useState(2023);
  const [trimestre, setTrimestre] = useState("Seleccione un trimestre");
  const [progress, setProgress] = useState(0);
  const [submit, setSubmit] = useState(false);
  const [modal, setModal] = useState(false);
  const [bitacoras, setBitacoras] = useState<Bitacoras[]>([
   
  ]);


  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    // setArchivo(event.target.files![0]);
    //  const regex = new RegExp("[^.]+$");
    if (event.target.files?.length == 0) return;
    const file = Array<File>();

    for (let index = 0; index < event.target.files!.length; index++) {
      file.push(event.target.files![index]);
    }
    setArchivo(file);
    // const extension = file.match(regex);
    //setSrc(`/assets/${extension![0].toString()}.png`);
  };

  const handleChangePeriodo = (event: ChangeEvent<HTMLInputElement>) => {
    setPeriodo(+event.target.value);
  };
  const handleChangeTrimestre = (e: ChangeEvent<HTMLSelectElement>) => {
    setTrimestre(e.target.value);
  };
  
  const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (trimestre == "Seleccione un trimestre")
      {
        alert("seleccione un trimestre");
        return;
      }
    if (formato == "Seleccione un formato") {
      alert("Seleccione un formato");
      return;
     }
    setSubmit(true);



    const data = new FormData();

    data.set("idUsuario", idusuario.toString());
    data.set("codigo", formato!);
    archivo?.map((a) => {
      data.append("archivos", a);
    });
    data.set("trimestre", trimestre.charAt(0));
    data.set("periodo", periodo.toString());

    const resultado = await postBitacoras(data, setProgress);
    await new Promise( resolve => {
      setTimeout(() => { resolve('')}, 3000)
    });

    
    setSubmit(false);
    setBitacorasResponse(resultado);
    setModal(true);
    setArchivo(null);

    //lamada a la api
    //post
    ///Bitacora/NuevaBitacora
  };

  const handleDeleteBitacora = async (idbitacora:number) => {
      await deleteBitacora(idbitacora);
    // alert(idbitacora)
     
  }

  return {
    inputArchivo,
    archivo,
    setArchivo,
    handleChangeFile,
    handleChangePeriodo,
    periodo,
    trimestre,
    handleChangeTrimestre,
    onFormSubmit,
    progress,
    submit,
    modal,
    setModal,
    bitacoras,
    setBitacoras,
    handleDeleteBitacora,

  };
};
