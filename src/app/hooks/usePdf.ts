import { useState } from "react";
import { fetchWithAuth } from "@/app/lib/api-fetch";


export default function usePdf() {
    const [loadingPdf, setLoadingPdf] = useState<boolean>(false);
    const abrirPDF = async (empleado: number, periodo: number, tipo: number) => {

        try {
            const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}pdf/${empleado}/${periodo}/${tipo}`);
            if (!response.ok) throw new Error("No se pudo generar el PDF");
    
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
    
            window.open(url, "_blank");

        } catch (err) {
            console.error("Error al abrir el PDF:", err);
        }
    
    
    };

    return {
        abrirPDF,
    }
}

