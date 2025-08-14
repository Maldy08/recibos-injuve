// src/app/soporte/components/FaqSection.tsx
'use client';

import { useState } from "react";

interface FAQ {
  id: number;
  pregunta: string;
  respuesta: string;
  categoria: string;
}

export const FaqSection = () => {
  const [preguntaAbierta, setPreguntaAbierta] = useState<number | null>(null);
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('todas');

  const faqs: FAQ[] = [
    {
      id: 1,
      categoria: 'acceso',
      pregunta: '¿Qué hago si no puedo acceder al sistema?',
      respuesta: 'Verifica que estés usando tu RFC correctamente. Asegúrate de que no tengas espacios al inicio o final. Si el problema persiste, contacta al administrador del sistema o crea un ticket de soporte.'
    },
    {
      id: 2,
      categoria: 'recibos',
      pregunta: '¿Por qué no aparecen mis recibos de nómina?',
      respuesta: 'Los recibos pueden no aparecer por las siguientes razones: 1) No se ha procesado la nómina del período, 2) Hay un problema con tu número de empleado, 3) Problemas temporales del servidor. Verifica el año seleccionado y contacta a soporte si persiste.'
    },
    {
      id: 3,
      categoria: 'pdf',
      pregunta: '¿Por qué no puedo descargar o ver el PDF de mi recibo?',
      respuesta: 'Esto puede deberse a: 1) Bloqueador de ventanas emergentes activado, 2) Problemas con tu navegador, 3) El PDF no se ha generado correctamente. Intenta con otro navegador o desactiva el bloqueador de ventanas emergentes.'
    },
    {
      id: 4,
      categoria: 'email',
      pregunta: '¿Por qué no recibo los recibos por correo electrónico?',
      respuesta: 'Revisa tu carpeta de spam o correo no deseado. Verifica que tu dirección de correo esté actualizada en el sistema. Si tienes un correo institucional, asegúrate de que esté configurado correctamente.'
    },
    {
      id: 5,
      categoria: 'navegador',
      pregunta: '¿Qué navegadores son compatibles con el sistema?',
      respuesta: 'El sistema es compatible con las versiones más recientes de Chrome, Firefox, Safari y Edge. Para una mejor experiencia, recomendamos mantener tu navegador actualizado.'
    },
    {
      id: 6,
      categoria: 'datos',
      pregunta: '¿Qué hago si mis datos personales están incorrectos?',
      respuesta: 'Los datos personales como nombre, RFC, CURP provienen del sistema de nómina. Para modificarlos, debes contactar al departamento de Recursos Humanos de tu institución.'
    },
    {
      id: 7,
      categoria: 'sistema',
      pregunta: '¿Por qué el sistema está lento?',
      respuesta: 'La lentitud puede deberse a: 1) Alta demanda del servidor, 2) Problemas de conectividad, 3) Navegador sobrecargado. Intenta cerrar otras pestañas, limpiar el caché del navegador o intentar más tarde.'
    },
    {
      id: 8,
      categoria: 'acceso',
      pregunta: '¿Puedo acceder al sistema desde mi celular?',
      respuesta: 'Sí, el sistema es responsivo y funciona en dispositivos móviles. Para una mejor experiencia, recomendamos usar la aplicación en modo horizontal (landscape) en tu teléfono.'
    }
  ];

  const categorias = [
    { value: 'todas', label: 'Todas las categorías' },
    { value: 'acceso', label: 'Acceso y Login' },
    { value: 'recibos', label: 'Recibos de Nómina' },
    { value: 'pdf', label: 'Descargas PDF' },
    { value: 'email', label: 'Correo Electrónico' },
    { value: 'navegador', label: 'Navegador' },
    { value: 'datos', label: 'Datos Personales' },
    { value: 'sistema', label: 'Sistema' },
  ];

  const faqsFiltradas = categoriaFiltro === 'todas' 
    ? faqs 
    : faqs.filter(faq => faq.categoria === categoriaFiltro);

  const togglePregunta = (id: number) => {
    setPreguntaAbierta(preguntaAbierta === id ? null : id);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#383838] mb-2 flex items-center gap-2">
          <svg className="w-7 h-7 text-[#6e1e2a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Preguntas Frecuentes
        </h2>
        <p className="text-gray-600">Encuentra respuestas rápidas a las preguntas más comunes</p>
      </div>

      {/* Filtro de Categorías */}
      <div className="mb-6">
        <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-2">
          Filtrar por categoría:
        </label>
        <select
          id="categoria"
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6e1e2a] focus:border-transparent"
        >
          {categorias.map(categoria => (
            <option key={categoria.value} value={categoria.value}>
              {categoria.label}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de FAQs */}
      <div className="space-y-3">
        {faqsFiltradas.map((faq) => (
          <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => togglePregunta(faq.id)}
              className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between group"
            >
              <span className="text-sm font-medium text-gray-800 group-hover:text-[#6e1e2a]">
                {faq.pregunta}
              </span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  preguntaAbierta === faq.id ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div className={`transition-all duration-300 ${
              preguntaAbierta === faq.id 
                ? 'max-h-96 opacity-100' 
                : 'max-h-0 opacity-0'
            } overflow-hidden`}>
              <div className="px-4 py-3 bg-white border-t border-gray-100">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {faq.respuesta}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mensaje si no hay resultados */}
      {faqsFiltradas.length === 0 && (
        <div className="text-center py-8">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.881-6.08 2.33l-.15.15a2 2 0 01-2.83 0l-.15-.15A7.962 7.962 0 015 15c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z" />
          </svg>
          <p className="text-gray-500">No se encontraron preguntas frecuentes para esta categoría.</p>
        </div>
      )}

      {/* Mensaje de ayuda adicional */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="text-sm font-semibold text-blue-800 mb-1">¿No encontraste la respuesta que buscas?</h3>
            <p className="text-sm text-blue-700">
              Si tu pregunta no aparece en esta lista, no dudes en crear un ticket de soporte usando el formulario de arriba. 
              Nuestro equipo te responderá lo antes posible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};