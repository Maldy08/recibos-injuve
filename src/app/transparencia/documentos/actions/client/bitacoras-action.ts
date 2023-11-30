
import transparenciaApi from "@/app/api/transparencia-api";

import axios, { AxiosProgressEvent } from "axios";




export const getBitacoras = async (idusuario: number, formato: string) => {
  try {
    const { data } = await axios.get(`/api/bitacoras/${idusuario}/${formato}`);
    return data;
    
  } catch (error) {
    console.log(error);
  }
};

export const postBitacoras = async(formData : FormData , setProgress: (t: number) => void ) => {
  // for( var f of formData.entries() ) {
  //   console.log(f);
  // }
  // return;

  try {
    const { data } = await transparenciaApi.postForm(`/Bitacora/NuevaBitacora`, formData , {
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {

        const progress =  Math.round(progressEvent.loaded * 100) / progressEvent.total!;
        // console.log("Loaded: " + progressEvent.loaded);
        // console.log("Total: " + progressEvent.total);
        setProgress(Math.round(progress));
      }
    })
      .then( (resp) => {
        return resp;
      })
      .catch( (error) => {
        return error.response;
      });

      return data;

  } catch (error) {
    console.log(error);
  }
}
