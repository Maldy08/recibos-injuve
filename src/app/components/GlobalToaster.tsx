"use client";

import { useEffect, useState } from "react";
import { LuCheckCircle2, LuCircle } from "react-icons/lu";
import { APP_TOAST_EVENT, AppToastPayload, AppToastType, toast } from "@/app/lib/toast";

interface ToastMessage {
  id: number;
  type: AppToastType;
  text: string;
}

const DEFAULT_DURATION = 4500;

export function GlobalToaster() {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const push = (payload: AppToastPayload) => {
      const id = Date.now() + Math.floor(Math.random() * 1000);
      setMessages((prev) => [...prev, { id, type: payload.type, text: payload.text }]);

      window.setTimeout(() => {
        setMessages((prev) => prev.filter((message) => message.id !== id));
      }, payload.durationMs ?? DEFAULT_DURATION);
    };

    const eventHandler = (event: Event) => {
      const customEvent = event as CustomEvent<AppToastPayload>;
      if (!customEvent.detail?.text) {
        return;
      }

      push(customEvent.detail);
    };

    const nativeAlert = window.alert.bind(window);
    window.alert = (message?: unknown) => {
      const text = typeof message === "string" ? message : String(message ?? "");
      if (text.trim()) {
        toast.info(text);
        return;
      }

      nativeAlert(message as string);
    };

    window.addEventListener(APP_TOAST_EVENT, eventHandler);

    return () => {
      window.alert = nativeAlert;
      window.removeEventListener(APP_TOAST_EVENT, eventHandler);
    };
  }, []);

  if (!messages.length) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm px-2 sm:px-0">
      {messages.map((message) => {
        const isSuccess = message.type === "success";
        const isError = message.type === "error";

        return (
          <div
            key={message.id}
            className={`rounded-lg border shadow-md px-4 py-3 text-sm flex items-start gap-2 whitespace-pre-line ${
              isSuccess
                ? "bg-green-50 border-green-200 text-green-800"
                : isError
                ? "bg-red-50 border-red-200 text-red-800"
                : "bg-blue-50 border-blue-200 text-blue-800"
            }`}
          >
            <span className="mt-0.5">
              {isSuccess ? (
                <LuCheckCircle2 size={18} />
              ) : isError ? (
                <LuCircle size={18} />
              ) : (
                <LuCircle size={18} />
              )}
            </span>
            <p>{message.text}</p>
          </div>
        );
      })}
    </div>
  );
}

