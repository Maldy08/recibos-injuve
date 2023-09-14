'use client';

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

interface Props {
    titulo: string;
}

export const FormLogin = ({ titulo } : Props) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/transparencia";

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setFormValues({ email: "", password: "" });

            const res = await signIn("credentials", {
                redirect: false,
                email: formValues.email,
                password: formValues.password,
                callbackUrl
            });

            setLoading(false);

            console.log(res);
            if (!res?.error) {
                router.push(callbackUrl);
            } else {
                setError("invalid email or password");
            }
        } catch (error: any) {
            setLoading(false);
            setError(error);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                   { titulo }
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuario</label>
                        <input
                            value={formValues.email}
                            onChange={handleChange}
                            type="text"
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                      focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                      dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input
                            value={formValues.password}
                            onChange={handleChange}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                      focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                      dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>

                    <button
                     disabled={loading}
                        type="submit"
                        className="w-full text-white bg-primary-900 hover:bg-primary-800 
                 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg
                 text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700
                 dark:focus:ring-primary-800 transition-all">
                        
                        {loading ? "Procesando..." : "Iniciar Sesión"}
                    </button>

                </form>
            </div>
        </div>
    )
}
