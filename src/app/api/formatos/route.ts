import { NextResponse } from "next/server";


interface Segments {
  params: {
    id: number;
  };
}

export async function GET(request: Request, { params }: Segments) {

    return NextResponse.json({
      hola: 'getTodosLosFormatos',
    });
  
}
