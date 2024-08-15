import { NextResponse } from "next/server";
import transparenciaApi from "@/app/api/transparencia-api";


interface Segments {
  params: {
    id: number;
  };
}

export async function GET(request: Request, { params }: Segments) {
  
  try {
    
    const { data } = await transparenciaApi.get(
      `api/Transparencia/Formatos/GetFormatoById?userId=${params.id}`
    )

    return NextResponse.json({
      idDepto: data.data[0].idDepto,
      reporte: data.data[0].reporte,
    });
  } catch (error) {
    return NextResponse.json({
      data: error,
    });
  }
}
