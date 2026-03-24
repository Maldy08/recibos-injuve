export const sendEmailHandler = (
  periodo: number,
  tipo: number,
  setLoading: (v: boolean) => void,
  setProgress: (v: number | null) => void,
  setProgressTotal: (v: number | null) => void
) => {
  setLoading(true);
  setProgress(0);
  setProgressTotal(null);

  const url = `/api/sse-proxy?periodo=${periodo}&tipo=${tipo}`;
  const eventSource = new EventSource(url);
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.progreso !== undefined && data.total !== undefined) {
      setProgress(data.progreso);
      setProgressTotal(data.total);
    }
    if (data.mensaje) {
      alert(data.mensaje);
      setLoading(false);
      setProgress(null);
      setProgressTotal(null);
      eventSource.close();
    }
    if (data.error) {
      alert(data.error);
      setLoading(false);
      setProgress(null);
      setProgressTotal(null);
      eventSource.close();
    }
  };

  eventSource.onerror = () => {
    alert("Error en la conexión con el servidor.");
    setLoading(false);
    setProgress(null);
    setProgressTotal(null);
    eventSource.close();
  };
};