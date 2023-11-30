import { Bitacoras } from ".";

export interface ResponseResult {
    setBitacoras: ( data: Array<Bitacoras> | null) => void;
}