import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { postBitacoras } from "../actions/client/bitacoras-action";
import { Bitacoras } from "@/interfaces";

interface Props {
  formato?:string
  idusuario:number
  setBitacorasResponse:( data: Bitacoras[] ) => void;
}

export const useCrearHipervinculo = ({ formato, idusuario, setBitacorasResponse }: Props) => {

  const inputArchivo = useRef<HTMLInputElement>(null);
  const [archivo, setArchivo] = useState<Array<File> | null>(null);
  const [periodo, setPeriodo] = useState(2023);
  const [trimestre, setTrimestre] = useState("Seleccione un trimestre")
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [submit, setSubmit] = useState(false);
  const [modal, setModal] = useState(true);    
  const [bitacoras, setBitacoras] = useState<Bitacoras[]>([
    {id: 1, nombreporte: 'LGT-BC-81-01-Fm-I', nombre: '202320233Fichas Generales Glosa MO 16 nov.pdf', hipervinculo: 'http://www.ceabc.gob.mx/ceatransparencia/81A01/20231Formatos-V3-214-23.pdf', existe: false},
    {id: 1, nombreporte: 'LGT-BC-81-01-Fm-I', nombre: '202320233Fichas Generales Glosa MO 16 nov.pdf', hipervinculo: 'http://www.ceabc.gob.mx/ceatransparencia/81A01/20231Formatos-V3-214-23.pdf', existe: false},
    {id: 1, nombreporte: 'LGT-BC-81-01-Fm-I', nombre: '202320233Fichas Generales Glosa MO 16 nov.pdf', hipervinculo: 'http://www.ceabc.gob.mx/ceatransparencia/81A01/20231Formatos-V3-214-23.pdf', existe: false},
    {id: 1, nombreporte: 'LGT-BC-81-01-Fm-I', nombre: '202320233Fichas Generales Glosa MO 16 nov.pdf', hipervinculo: 'http://www.ceabc.gob.mx/ceatransparencia/81A01/20231Formatos-V3-214-23.pdf', existe: false},
    {id: 1, nombreporte: 'LGT-BC-81-01-Fm-I', nombre: '202320233Fichas Generales Glosa MO 16 nov.pdf', hipervinculo: 'http://www.ceabc.gob.mx/ceatransparencia/81A01/20231Formatos-V3-214-23.pdf', existe: false},
]);


  const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
   // setArchivo(event.target.files![0]);
    //  const regex = new RegExp("[^.]+$");
    if(event.target.files?.length == 0) return ;
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
 }
 const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  if( trimestre == "Seleccione un trimestre") alert('seleccione un trimestre')
  if( formato == "Seleccione un formato"  ) alert('Seleccione un formato')
  setSubmit(true);
  const data = new FormData()

    data.set('idUsuario', idusuario.toString());
    data.set('codigo',formato!);
    archivo?.map( (a) => {
     data.append('archivos',a);
  })
    data.set('trimestre', trimestre.charAt(0));
    data.set('periodo',periodo.toString());

   const resultado = await postBitacoras(data,setProgress);
   setSubmit(false);

   //console.log(JSON.stringify(resultado));
   //if(resultado.response.status == 200) {
    setBitacorasResponse(resultado);
   //}

  //lamada a la api
  //post
  ///Bitacora/NuevaBitacora
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
  };
};
