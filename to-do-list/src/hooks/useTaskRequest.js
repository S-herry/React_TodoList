import { useState, useCallback } from "react";

const url = "http://localhost:5001/api/init";

export default function useTaskRequest() {
  const [taskRequest, setTaskRequest] = useState(null);
  const handleTaskRequest = useCallback(
    async ({ method, id, content, completed }) => {
      let endpoint = url;
      let options = {
        method,
        headers: { "Content-Type": "application/json" },
      };

      if (method === "DELETE") {
        endpoint = `${url}/${id}`;
      } else if (method === "PUT") {
        endpoint = `${url}/${id}`;
        options.body = JSON.stringify({ id, content, completed });
      } else if (method !== "GET") {
        options.body = JSON.stringify({ id, content, completed });
      }

      try {
        const response = await fetch(endpoint, options);
        if (!response.ok) throw new Error("Failed: " + response.status);
        const data = await response.json();
        // 只有 GET 才設置整包資料
        if (method === "GET") {
          setTaskRequest(data);
        }

        return data;
      } catch (error) {
        console.error("Error:", error);
        if (method === "GET") {
          setTaskRequest(null);
        }
        return null;
      }
    },
    []
  );

  return { taskRequest, setTaskRequest, handleTaskRequest };
}
