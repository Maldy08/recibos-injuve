/**
 * Convierte el paso técnico del proceso en un mensaje amigable para el usuario
 */
const getPasoMensaje = (paso: string): string => {
    const mensajes: Record<string, string> = {
        'obtener_datos_nomina': 'No se encontró información de nómina para este empleado en el periodo seleccionado',
        'inicialización_jsreport': 'Error al inicializar el sistema de generación de PDF',
        'leer_plantilla': 'Error al cargar la plantilla del recibo',
        'generar_pdf': 'Error al generar el PDF del recibo',
        'enviar_correo': 'Error al enviar el correo electrónico. Verifica la dirección de correo',
        'proceso_general': 'Error inesperado. Por favor intenta nuevamente'
    };
    
    return mensajes[paso] || 'Error al procesar la solicitud. Por favor intenta nuevamente';
};

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

            const data = await response.json();

            // Manejar errores HTTP
            if (!response.ok) {
                // Error con información detallada del paso
                if (data.paso) {
                    const mensajeUsuario = getPasoMensaje(data.paso);
                    alert(mensajeUsuario);
                    
                    // Log detallado para debugging
                    console.error('Error en el paso:', data.paso);
                    console.error('Detalles técnicos:', data.detalles || data.error);
                    console.error('Datos completos:', data);
                } 
                // Error con información de parámetros faltantes
                else if (data.detalles && typeof data.detalles === 'object') {
                    alert(`Error: ${data.error || 'Faltan parámetros requeridos'}`);
                    console.error('Parámetros recibidos:', data.detalles);
                }
                // Error genérico
                else {
                    alert(data.error || 'No se pudo enviar el correo');
                    console.error('Error del servidor:', data);
                }
                
                return;
            }

            // Éxito - mostrar mensaje mejorado
            if (data.mensaje) {
                // Si tenemos información adicional, mostrar un mensaje más completo
                if (data.empleado && data.correo) {
                    alert(`✅ Correo enviado exitosamente\n\nEmpleado: ${data.empleado}\nCorreo: ${data.correo}\nPeriodo: ${data.periodo || periodo}`);
                } else {
                    alert(data.mensaje);
                }
                
                console.log("✅ Correo enviado correctamente:", data);
            }

        } catch (err) {
            // Error de red o error inesperado
            console.error("Error al enviar el correo:", err);
            alert("Error de conexión. Por favor verifica tu conexión a internet e intenta nuevamente");
        }
    };

    return {
        sendMail,
    };
}