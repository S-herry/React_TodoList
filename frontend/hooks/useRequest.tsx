import { useState, useCallback } from "react";
import { RequestProps } from "../src/components/type/Request";

interface Options {
  method: string;
  headers: {
    "Content-Type": string;
  };
  body?: string;
}

export default function useRequest<T>() {
  const [response, setResponse] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleRequest = useCallback(
    async ({ url, method, data }: RequestProps) => {
      const options: Options = {
        method,
        headers: { "Content-Type": "application/json" },
      };

      if (method === "POST" || method === "PUT") {
        options.body = JSON.stringify(data);
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error("HTTP error: " + res.status);

        const result: T = await res.json();
        setResponse(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { response, loading, error, handleRequest };
}
