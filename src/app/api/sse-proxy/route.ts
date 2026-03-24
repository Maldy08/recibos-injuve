import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const token = (session.user as any).token as string | undefined;
  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const periodo = searchParams.get("periodo");
  const tipo = searchParams.get("tipo");

  if (!periodo || !tipo) {
    return new Response("Bad Request: missing periodo or tipo", { status: 400 });
  }

  const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}send-email/enviar-recibos?periodo=${periodo}&tipo=${tipo}`;

  const backendResponse = await fetch(backendUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "text/event-stream",
    },
    // Ensure Next.js does not cache this streaming response
    cache: "no-store",
  });

  if (!backendResponse.ok || !backendResponse.body) {
    return new Response("Error connecting to backend SSE", {
      status: backendResponse.status,
    });
  }

  return new Response(backendResponse.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
