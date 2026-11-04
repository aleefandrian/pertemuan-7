import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTemaStore = create(
  persist(
    (set) => ({
      temaGelap: false,
      ubahTema: () => set((state) => ({ temaGelap: !state.temaGelap })),
    }),
    {
      name: "tema-storage",
    },
  ),
);
