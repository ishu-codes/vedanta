import { create } from "zustand";

interface progressStoreInterface {
    currentState: string;
    outputs: string[];
    theme: string;
    setCurrentState: (newState: string) => void;
    updateOutputs: (newOutputs: string[]) => void;
    updateTheme: (newTheme: string) => void;
    toggleOutputChoice: (output: string) => void;
}

const useProgressStore = create<progressStoreInterface>((set) => ({
    currentState: "Upload",
    outputs: ["Slides"],
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
    // toggleOutputChoice: (output: string) => () => ({
    //     // let choice = state
    //     set((state) => {
    //         let choice = state.choices.fin
    //     })
    // }),
    toggleOutputChoice: (output: string) =>
        set((state) => {
            let choice = state.outputs.includes(output);
            if (choice) {
                return {
                    outputs: state.outputs.filter((op) => op !== output),
                };
            }
            return { outputs: [...state.outputs, output] };
        }),
}));

export default useProgressStore;
