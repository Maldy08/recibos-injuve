import { ImSpinner2 } from "react-icons/im";

interface LoadingOverlayProps {
  text?: string;
}

export default function LoadingOverlay({ text = "Cargando..." }: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="flex flex-col items-center gap-4 bg-white rounded-xl shadow-lg px-8 py-6">
        <ImSpinner2 className="animate-spin text-4xl text-[#6e1e2a]" />
        <span className="text-[#6e1e2a] font-semibold text-lg">{text}</span>
      </div>
    </div>
  );
}