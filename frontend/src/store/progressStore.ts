import { create } from "zustand";

interface progressStoreInterface {
    currentState: string;
    outputs: string[];
    theme: string;
    setCurrentState: (newState: string) => void;
    updateOutputs: (newOutputs: string[]) => void;
    updateTheme: (newTheme: string) => void;
}

const useProgressStore = create<progressStoreInterface>((set) => ({
    currentState: "Upload",
    outputs: ["slides"],
    theme: "theme1",
    setCurrentState: (newState: string) =>
        set(() => ({
            currentState: newState,
        })),
    updateOutputs: (newOutputs: string[]) =>
        set(() => ({
            outputs: newOutputs,
        })),
    updateTheme: (newTheme: string) => () => ({
        theme: newTheme,
    }),
}));

export default useProgressStore;
