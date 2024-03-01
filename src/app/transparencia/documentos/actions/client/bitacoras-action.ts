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

export const postBitacoras = async (
  formData: FormData,
  setProgress: (t: number) => void
) => {

  try {
    const { data } = await transparenciaApi.postForm(
      `/Bitacora/NuevaBitacora`,
      formData
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteBitacora = async (idbitacora: number) => {
  try {
    const { data } = await axios.post(`/api/bitacoras/${idbitacora}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

