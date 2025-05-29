import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Footer, Header, Sidebar } from "../components";

export default async function OficiosLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/api/auth/signin')
  }

  const user = session.user;
  const admin = user!.admin || 0;

  return (
    <div className="flex h-screen">
      <Sidebar isAdmin={admin === 1 ? true : false} /> {/* Mueve el sidebar fuera del flex principal para asegurarte de que ocupe su espacio adecuado */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex h-full ml-4 mt-16"> {/* Añade margen izquierdo para el sidebar y superior para el header */}
          <main className="flex-grow overflow-x-hidden overflow-y-auto mb-14">
            <div className="w-full px-6 py-8 lg:md:items-center lg:md:justify-center">
              {children}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
