import { NextResponse } from "next/server";
import transparenciaApi from "@/app/api/transparencia-api";


interface Segments {
  params: {
    id: number;
    formato: string;
  };
}

export async function GET(request: Request, { params }: Segments) {
  try {
    const { data } = await transparenciaApi.get(
      `/Bitacora/GetBitacorasByFormato?idUsuario=${params.id}&formato=${params.formato}`
    );

    return NextResponse.json({
        result: data
    });
  } catch (error) {
    return NextResponse.json({
      data: error,
    });
  }


}
