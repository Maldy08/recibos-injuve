import { TablaBitacoras } from "@/interfaces";
import axios from "axios";

export const getBitacoras = async (idusuario: number, formato: string) => {
  try {
    const { data } = await axios.get(`/api/bitacoras/${idusuario}/${formato}`);
    return data;
    
  } catch (error) {
    console.log(error);
  }
};
