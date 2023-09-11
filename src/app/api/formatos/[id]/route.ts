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
    const { data } = await transparenciaApi.get<Formato[]>(
      `/Bitacora/GetBitacoras?idUsuario=${params.id}`
    );

    return NextResponse.json({
      data: data,
    });
    
  } catch (error) {
    return NextResponse.json({
      data: error,
    });
  }
}
