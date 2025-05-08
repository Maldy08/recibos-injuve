import Image from "next/image"
import { FormLogin } from "./FormLogin";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export const metadata = {
    title: 'Login Page',
    description: 'Login Page',
};


export default async function LoginPage() {

    const session = await getServerSession(authOptions);
    if( session ) {
      redirect('/transparencia/documentos')
    }

    const sistema = process.env.NOMBRE_SISTEMA;

    return (
        <section className=" bg-primary-900 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <Image src={"/assets/logo.png"} alt="logo" width={400} height={100} className="m-6" />
                <FormLogin titulo={ sistema! } />
            </div>
        </section>

    );
}