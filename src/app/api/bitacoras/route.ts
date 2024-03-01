import { NextResponse } from "next/server";
import transparenciaApi from "../transparencia-api";

interface Segments {
  params: {
    formData: FormData;
  };
}

export async function POST(request: Request) {
  try {

    const body =  await request.formData();

    const { data } = await transparenciaApi.postForm(
      '/Bitacora/NuevaBitacora',body
    );


    return NextResponse.json({
      result: data,
    });
  } catch (error) {
    return NextResponse.json({
      data: error,
    });
  }
}

