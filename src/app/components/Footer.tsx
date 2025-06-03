const sistema = process.env.NOMBRE_SISTEMA?.toUpperCase();

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 z-30 w-full bg-[#2b2b2b]/90 backdrop-blur-sm border-t border-white/10 text-gray-300 text-center py-3 shadow-inner">
      <span className="text-xs tracking-wide font-light">
        {`INSTITUTO DE LA JUVENTUD DEL ESTADO DE BAJA CALIFORNIA — 2025 © ${sistema}`}
      </span>
    </footer>
  );
};