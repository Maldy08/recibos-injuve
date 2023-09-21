import { NextResponse } from "next/server";
import transparenciaApi from "../../transparencia-api";
import { Formato } from "@/interfaces/Formato";

interface Segments {
  params: {
    id: number;
  };
}

export async function GET(request: Request, { params }: Segments) {
  try {
    const { data } = await transparenciaApi.get(
      `/Formato/GetFormatoById?userId=${params.id}`
    );

    return NextResponse.json({
      idDepto: data[0].idDepto,
      reporte: data[0].reporte,
    });
  } catch (error) {
    return NextResponse.json({
      data: error,
    });
  }
}
