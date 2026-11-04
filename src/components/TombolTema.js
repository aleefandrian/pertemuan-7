"use client";

import { useTemaStore } from "@/store/useTemaStore";

export default function TombolTema() {
  const { temaGelap, ubahTema } = useTemaStore();

  return (
    <button
      onClick={ubahTema}
      style={{
        padding: "8px 16px",
        background: temaGelap ? "#f8fafc" : "#0f172a",
        color: temaGelap ? "#0f172a" : "#f8fafc",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      {temaGelap ? "☀️ Mode Terang" : "🌙 Mode Gelap"}
    </button>
  );
}