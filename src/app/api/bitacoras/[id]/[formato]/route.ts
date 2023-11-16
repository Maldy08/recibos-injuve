import { NextResponse } from "next/server";
import transparenciaApi from "@/app/api/transparencia-api";
import { AxiosProgressEvent } from "axios";


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

export async function POST(request: Request) {
  const data = await request.formData(); 
  const response = transparenciaApi.postForm(`/NuevaBitacora`, data, {
    // onUploadProgress : (event :AxiosProgressEvent) => {
    //   const progress = Math.round((event.loaded * 100) / event.total!);
    // }
  })
  .then((resp) => {
    return resp;
  })
  .catch((error) => {
    return error.response;
  });

  return NextResponse.json({
    data: response
  });

}
