export default function useSendMail() {
    const sendMail = async (empleado: number, periodo: number, correo: string, tipo:number) => {
        if (!empleado || !periodo || !correo || !tipo) {
            alert("Faltan datos para enviar el correo");
            console.error("Faltan datos para enviar el correo");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(correo)) {
            alert("El correo no es válido");
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}send-email/enviar-recibo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    empleado,
                    periodo,
                    correo,
                    tipo,
                }),
            });

            if (!response.ok) throw new Error("No se pudo enviar el correo");

            const data = await response.json();
            console.log("Correo enviado:", data);
        } catch (err) {
            console.error("Error al enviar el correo:", err);
        }
    };

    return {
        sendMail,
    };
}