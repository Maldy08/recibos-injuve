// src/app/soporte/components/FormularioSoporte.tsx
'use client';

import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";

export const FormularioSoporte = () => {
  const [formData, setFormData] = useState({
    tipoProblema: '',
    prioridad: 'media',
    asunto: '',
    descripcion: '',
    nombre: '',
    email: '',
    empleado: '',
    rfc: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState<'success' | 'error' | ''>('');

  const tiposProblema = [
    { value: 'acceso', label: 'Problemas de Acceso / Login' },
    { value: 'recibos', label: 'Problemas con Recibos' },
    { value: 'pdf', label: 'Problemas para Descargar PDF' },
    { value: 'email', label: 'Problemas con Envío de Email' },
    { value: 'navegador', label: 'Problemas del Navegador' },
    { value: 'datos', label: 'Datos Incorrectos' },
    { value: 'lentitud', label: 'Sistema Lento' },
    { value: 'otro', label: 'Otro' },
  ];

  const prioridades = [
    { value: 'baja', label: 'Baja', color: 'text-green-600' },
    { value: 'media', label: 'Media', color: 'text-yellow-600' },
    { value: 'alta', label: 'Alta', color: 'text-red-600' },
    { value: 'critica', label: 'Crítica', color: 'text-red-800' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMensaje('');

    try {
      // Aquí simularemos el envío del ticket
      // En una implementación real, enviarías esto a tu API
      
      const ticketData = {
        ...formData,
        fechaCreacion: new Date().toISOString(),
        estado: 'abierto',
        ticketId: `TICK-${Date.now()}`,
      };

      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Ticket creado:', ticketData);
      
      setTipoMensaje('success');
      setMensaje(`¡Ticket creado exitosamente! Número de ticket: ${ticketData.ticketId}. Recibirás una respuesta en tu correo electrónico.`);
      
      // Limpiar formulario
      setFormData({
        tipoProblema: '',
        prioridad: 'media',
        asunto: '',
        descripcion: '',
        nombre: '',
        email: '',
        empleado: '',
        rfc: '',
      });

    } catch (error) {
      console.error('Error al crear ticket:', error);
      setTipoMensaje('error');
      setMensaje('Error al enviar el ticket. Por favor intenta nuevamente o contacta al administrador.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Información del Usuario */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Información Personal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre Completo *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6e1e2a] focus:border-transparent"
                placeholder="Tu nombre completo"
              />
            </div>
            <div>
              <label htmlFor="empleado" className="block text-sm font-medium text-gray-700 mb-1">
                Número de Empleado (opcional)
              </label>
              <input
                type="text"
                id="empleado"
                name="empleado"
                value={formData.empleado}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6e1e2a] focus:border-transparent"
                placeholder="Número de empleado"
              />
            </div>
            <div>
              <label htmlFor="rfc" className="block text-sm font-medium text-gray-700 mb-1">
                RFC (opcional)
              </label>
              <input
                type="text"
                id="rfc"
                name="rfc"
                value={formData.rfc}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6e1e2a] focus:border-transparent"
                placeholder="RFC"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email de Contacto *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6e1e2a] focus:border-transparent"
                placeholder="correo@ejemplo.com"
              />
            </div>
          </div>
        </div>

        {/* Tipo de Problema */}
        <div>
          <label htmlFor="tipoProblema" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Problema *
          </label>
          <select
            id="tipoProblema"
            name="tipoProblema"
            value={formData.tipoProblema}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6e1e2a] focus:border-transparent"
          >
            <option value="">Selecciona el tipo de problema</option>
            {tiposProblema.map(tipo => (
              <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
            ))}
          </select>
        </div>

        {/* Prioridad */}
        <div>
          <label htmlFor="prioridad" className="block text-sm font-medium text-gray-700 mb-1">
            Prioridad *
          </label>
          <select
            id="prioridad"
            name="prioridad"
            value={formData.prioridad}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6e1e2a] focus:border-transparent"
          >
            {prioridades.map(prioridad => (
              <option key={prioridad.value} value={prioridad.value} className={prioridad.color}>
                {prioridad.label}
              </option>
            ))}
          </select>
        </div>

        {/* Asunto */}
        <div>
          <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-1">
            Asunto *
          </label>
          <input
            type="text"
            id="asunto"
            name="asunto"
            value={formData.asunto}
            onChange={handleChange}
            required
            maxLength={100}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6e1e2a] focus:border-transparent"
            placeholder="Resumen breve del problema"
          />
          <p className="text-xs text-gray-500 mt-1">{formData.asunto.length}/100 caracteres</p>
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción del Problema *
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
            rows={6}
            maxLength={1000}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6e1e2a] focus:border-transparent"
            placeholder="Describe detalladamente el problema que estás experimentando. Incluye los pasos que realizaste, mensajes de error, y cualquier información adicional que pueda ayudar a resolver el problema."
          />
          <p className="text-xs text-gray-500 mt-1">{formData.descripcion.length}/1000 caracteres</p>
        </div>

        {/* Botón de Envío */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#6e1e2a] hover:bg-[#5b1823] disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <ImSpinner2 className="animate-spin" />
              Enviando Ticket...
            </>
          ) : (
            'Enviar Ticket de Soporte'
          )}
        </button>
      </form>

      {/* Mensaje de Respuesta */}
      {mensaje && (
        <div className={`mt-4 p-4 rounded-lg border ${
          tipoMensaje === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <div className="flex items-start gap-2">
            {tipoMensaje === 'success' ? (
              <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <p className="text-sm">{mensaje}</p>
          </div>
        </div>
      )}
    </div>
  );
};