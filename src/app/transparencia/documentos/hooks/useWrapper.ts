import { ChangeEvent, useState } from "react"


export const useWrapper = () => {
    const [formato, setFormato] = useState("Seleccione un formato")

    const handleChangeFormato = async(e: ChangeEvent<HTMLSelectElement>) => {
        setFormato(e.target.value)
    }

    return {
        formato,
        setFormato,
        handleChangeFormato,
    }
}
