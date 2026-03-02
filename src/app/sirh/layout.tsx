import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Footer, Header, Sidebar, PWAInstallPrompt, OfflineBanner } from "../components";

export default async function SirhLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login')
  }

  const user = session.user;
  const admin = user!.admin || 0;

  return (
    <div className="flex h-screen">
      <OfflineBanner />
      <Sidebar isAdmin={admin === 1 ? true : false} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex h-full ml-4 mt-16">
          <main className="flex-grow overflow-x-hidden overflow-y-auto mb-14 safe-area-inset-bottom">
            <div className="w-full px-6 py-8 lg:md:items-center lg:md:justify-center">
              {children}
            </div>
          </main>
        </div>
      </div>
      <PWAInstallPrompt />
    </div>
  );
}
