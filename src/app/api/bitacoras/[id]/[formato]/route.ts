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
      `api/Transparencia/Bitacoras/GetBitacorasByUserIdAndFormato?userId=${params.id}&formato=${params.formato}`
    );


    return NextResponse.json({
        result: data.data
    });
  } catch (error) {
    return NextResponse.json({
      data: error,
    });
  }

}

export async function POST(request: Request) {
  const data = await request.formData(); 
  console.log(data);
  const response = transparenciaApi.postForm(`api/Transparencia/Bitacoras/CreateBitacora`, data, {
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
