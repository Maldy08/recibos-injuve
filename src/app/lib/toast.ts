export type AppToastType = "success" | "error" | "info";

export interface AppToastPayload {
  type: AppToastType;
  text: string;
  durationMs?: number;
}

export const APP_TOAST_EVENT = "app-toast";

export const showAppToast = (payload: AppToastPayload) => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent<AppToastPayload>(APP_TOAST_EVENT, { detail: payload }));
};

export const toast = {
  success: (text: string, durationMs?: number) =>
    showAppToast({ type: "success", text, durationMs }),
  error: (text: string, durationMs?: number) =>
    showAppToast({ type: "error", text, durationMs }),
  info: (text: string, durationMs?: number) =>
    showAppToast({ type: "info", text, durationMs }),
};
