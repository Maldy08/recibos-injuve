import { getServerSession } from "next-auth";
import { Footer, Header, Sidebar } from "../components";


export default async function TransparenciaLayout({
    children
}: {
    children: React.ReactNode;
}) {

    
  const session = await getServerSession();
  console.log(session)
    return (
        <div className="flex h-screen">
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <div className="flex h-full">
                    <div className="flex w-64 h-full">
                        <div className="w-full flex mx-auto ">
                            <Sidebar />
                        </div>
                    </div>
                    <main className="flex flex-col w-full overflow-x-hidden overflow-y-auto mb-14">
                        <div className="flex w-full mx-auto px-6 py-8">
                            { children }
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </div>

    );
}