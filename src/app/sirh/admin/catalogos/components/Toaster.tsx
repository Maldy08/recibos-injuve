"use client";

import { LuCheckCircle2, LuCircle } from "react-icons/lu";

export interface ToastMessage {
  id: number;
  type: "success" | "error";
  text: string;
}

interface ToasterProps {
  messages: ToastMessage[];
}

export default function Toaster({ messages }: ToasterProps) {
  return (
    <div className="fixed top-4 right-4 z-[60] flex flex-col gap-2 w-full max-w-sm">
      {messages.map((message) => {
        const isSuccess = message.type === "success";

        return (
          <div
            key={message.id}
            className={`rounded-lg border shadow-md px-4 py-3 text-sm flex items-start gap-2 ${
              isSuccess
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            <span className="mt-0.5">
              {isSuccess ? <LuCheckCircle2 size={18} /> : <LuCircle size={18} />}
            </span>
            <p>{message.text}</p>
          </div>
        );
      })}
    </div>
  );
}

