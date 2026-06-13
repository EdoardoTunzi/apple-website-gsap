import { create } from "zustand";

type MacbookState = {
  color: string;
  setColor: (color: string) => void;
  scale: number;
  setScale: (scale: number) => void;
  reset: () => void;
};

const useMacbookStore = create<MacbookState>((set) => ({
  color: "#2e2c2e",
  setColor: (color: string) => set({ color }),

  scale: 0.08,
  setScale: (scale: number) => set({ scale }),

  reset: () => set({ color: "#2e2c2e", scale: 0.08 })
}));

export default useMacbookStore;
