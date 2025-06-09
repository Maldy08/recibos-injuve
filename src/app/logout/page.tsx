export default function LogoutPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Sesión cerrada</h1>
      <p className="text-gray-600">Has cerrado sesión exitosamente.</p>
      <a href="/login" className="mt-6 text-blue-600 hover:underline">Volver al inicio</a>
    </div>
  );
}