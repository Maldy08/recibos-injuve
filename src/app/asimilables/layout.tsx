import { Footer, Header, Sidebar } from "../components";


export default function AsimilablesLayout({
    children
}: {
    children: React.ReactNode;
}) {
     return (
        <div className="flex h-screen">
          <Sidebar /> {/* Mueve el sidebar fuera del flex principal para asegurarte de que ocupe su espacio adecuado */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <div className="flex h-full ml-4 mt-16"> {/* Añade margen izquierdo para el sidebar y superior para el header */}
              <main className="flex-grow overflow-x-hidden overflow-y-auto mb-14">
                <div className="w-full px-6 py-8 lg:md:items-center lg:md:justify-center">
                  { children }
                </div>
              </main>
            </div>
          </div>
          <Footer />
        </div>
      );
}