import { NextResponse } from "next/server";
import transparenciaApi from "../transparencia-api";

export async function GET(request: Request) {
  try {
    const { data } = await transparenciaApi.get(
      `/Bitacora/GetBitacoras?idUsuario=1`
    );

    return NextResponse.json({
      hola: request,
    });

  } catch (error) {
    return NextResponse.json({
      hola: error,
    });
  }
}
