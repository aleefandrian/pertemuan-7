"use client";

import { useTemaStore } from "@/store/useTemaStore";

export default function ClientLayout({ children }) {
  const { temaGelap } = useTemaStore();

  return (
    <body
      className="min-h-full flex flex-col"
      style={{
        backgroundColor: temaGelap ? "#0f172a" : "#ffffff",
        color: temaGelap ? "#f8fafc" : "#0f172a",
        transition: "background-color 0.3s ease, color 0.3s ease",
        minHeight: "100vh",
        fontColor: temaGelap ? "#f8fafc" : "#0f172a",
      }}
    >
      {children}
    </body>
  );
}