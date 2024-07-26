import { create } from "zustand";

interface fileStoreInterface {
    validFile: boolean;
    file?: File;
    fileName: string;
    setValidFile: (file: File) => void;
    setInvalidFile: () => void;
}

const useFileStore = create<fileStoreInterface>((set) => ({
    validFile: false,
    file: undefined,
    fileName: "",
    setValidFile: (file: File) =>
        set((state) => ({
            validFile: true,
            file,
            fileName: file.name,
        })),
    setInvalidFile: () =>
        set((state) => ({
            validFile: false,
            file: undefined,
            fileName: "",
        })),
}));

export default useFileStore;
