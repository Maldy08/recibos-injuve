'use client';

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

interface Props {
    titulo: string;
}

export const FormLogin = ({ titulo }: Props) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        rfc: ""
    });
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    const searchParams = useSearchParams();
    const rawCallback = searchParams.get("callbackUrl");
    const callbackUrl = rawCallback && rawCallback !== "undefined" ? rawCallback : "/";

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setFormValues({ rfc: "" });

            const res = await signIn("credentials", {
                redirect: false,
                rfc: formValues.rfc,
                callbackUrl
            });

            setLoading(false);

            console.log(res);
            if (res?.ok && res.url) {
                router.push(res.url);
            } else {
                setError("rfc incorrecto");
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
        <>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        {titulo}
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="rfc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RFC</label>
                            <input
                                value={formValues.rfc}
                                onChange={handleChange}
                                type="text"
                                name="rfc"
                                id="rfc"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                                    focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                    dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=""
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
            {open && <div className="animate-openmodal text-white px-6 py-4 border-0 rounded relative mb-4 bg-primary-800 mt-6">
                <span className="text-xl inline-block mr-5 align-middle">
                    <i className="fas fa-bell" />
                </span>
                <span className="inline-block align-middle mr-8 text-sm">
                    <b> {error} </b>
                </span>
                <button
                    onClick={() => setOpen(false)}
                    className=" absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none">
                    <span>×</span>
                </button>
            </div>}
        </>

    )
}
