import { getServerSession } from "next-auth";
import { Footer, Header, Sidebar } from "../components";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


export default async function TransparenciaLayout({
    children
}: {
    children: React.ReactNode;
}) {

    
  const session = await getServerSession(authOptions);
  if( !session ) {
    redirect('/api/auth/signin')
  }
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
                    <main className=" overflow-x-hidden overflow-y-auto mb-14">
                        <div className="flex w-full mx-auto px-6 py-8 lg:md:items-center lg:md:justify-center">
                            { children }
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </div>

    );
}