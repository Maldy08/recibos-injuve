import { TablaBitacoras } from "@/interfaces";
import axios from "axios";

export const getBitacoras = async (idusuario: number, formato: string) => {
  try {
    const { data } = await axios.get(`/api/bitacoras/${idusuario}/${formato}`)
    return data ;
    // const data = await fetch(`/api/bitacoras/${idusuario}/${formato}`);
    // const json = await data.json();

    // return json;
  } catch (error) {
    console.log(error);
  }
};
