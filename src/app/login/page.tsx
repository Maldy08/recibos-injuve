import Image from "next/image"
import { FormLogin } from "./FormLogin";


export const metadata = {
    title: 'Login Page',
    description: 'Login Page',
};


export default function LoginPage() {

    const sistema = process.env.NOMBRE_SISTEMA;

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <Image src={"/assets/logo.png"} alt="logo" width={400} height={100} className="m-6" />
                <FormLogin titulo={ sistema! } />
            </div>
        </section>

    );
}