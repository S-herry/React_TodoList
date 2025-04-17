export interface RequestProps {
  url: string;
  method: "PUT" | "GET" | "DELETE" | "POST";
  data?: unknown;
}
