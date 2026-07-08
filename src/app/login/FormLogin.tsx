'use client';

import { getSession, signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

interface Props {
    titulo: string;
}

export const FormLogin = ({ titulo }: Props) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        usuario: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    const searchParams = useSearchParams();
    const rawCallback = searchParams.get("callbackUrl");
    const callbackUrl = rawCallback && rawCallback !== "undefined" ? rawCallback : "/sirh";

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setFormValues({ usuario: "", password: "" });

            const res = await signIn("credentials", {
                redirect: false,
                usuario: formValues.usuario,
                password: formValues.password,
                callbackUrl
            });

            setLoading(false);

            console.log(res);
            if (res?.ok && res.url) {
                //await getSession()
                router.push(res.url);
                router.refresh();
            } else {
                setError("Usuario o contraseña incorrectos");
                setOpen(true)
            }
        } catch (error: any) {
            setLoading(false);
            setError(error);
            console.log(error)
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    {titulo}
                </h1>
                
                {open && (
                    <div className="animate-openmodal bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-sm flex items-center justify-between gap-2" role="alert">
                        <span className="font-medium">{error}</span>
                        <button
                            onClick={() => setOpen(false)}
                            className="text-red-500 hover:text-red-800 text-lg font-bold leading-none p-1 focus:outline-none transition-colors"
                            aria-label="Cerrar alerta"
                        >
                            ×
                        </button>
                    </div>
                )}

                <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="usuario" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuario</label>
                        <input
                            value={formValues.usuario}
                            onChange={handleChange}
                            type="text"
                            name="usuario"
                            id="usuario"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                                focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Ingresa tu usuario"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                        <input
                            value={formValues.password}
                            onChange={handleChange}
                            type="password"
                            name="password"
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                                focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Ingresa tu contraseña"
                            required
                        />
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full text-white bg-primary-900 hover:bg-[#5b1823] 
                                focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-xl
                                text-sm px-5 py-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700
                                dark:focus:ring-primary-800 transition-all shadow-md hover:shadow-lg transform active:scale-[0.98]">
                        {loading ? "Procesando..." : "Iniciar Sesión"}
                    </button>
                </form>
            </div>
        </div>
    );
}
