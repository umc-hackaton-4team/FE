import { useState, useCallback } from "react";
import { api } from "../api/axios";
import type { AxiosRequestConfig, AxiosError } from "axios";

interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends ApiState<T> {
  execute: (config?: AxiosRequestConfig) => Promise<T | null>;
  reset: () => void;
}

export function useApi<T = unknown>(
  initialConfig?: AxiosRequestConfig
): UseApiReturn<T> {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const execute = useCallback(
    async (config?: AxiosRequestConfig): Promise<T | null> => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const mergedConfig = { ...initialConfig, ...config };
        const response = await api.request<T>(mergedConfig);
        setState({ data: response.data, isLoading: false, error: null });
        return response.data;
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "요청 중 오류가 발생했습니다.";
        setState({ data: null, isLoading: false, error: errorMessage });
        return null;
      }
    },
    [initialConfig]
  );

  const reset = useCallback(() => {
    setState({ data: null, isLoading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

// GET 요청 전용 훅
export function useGet<T = unknown>(url: string) {
  return useApi<T>({ method: "GET", url });
}

// POST 요청 전용 훅
export function usePost<T = unknown>(url: string) {
  return useApi<T>({ method: "POST", url });
}
