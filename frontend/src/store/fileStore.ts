import { create } from "zustand";

interface fileStoreInterface {
    validFile: boolean;
    file?: File;
    fileName: string;
    slidesGenerated: boolean;
    videoGenerated: boolean;
    setValidFile: (file: File) => void;
    setInvalidFile: () => void;
    setSlidesGenerated: (status: boolean) => void;
    setVideoGenerated: (status: boolean) => void;
}

const useFileStore = create<fileStoreInterface>((set) => ({
    validFile: false,
    file: undefined,
    fileName: "",
    slidesGenerated: false,
    videoGenerated: false,
    setValidFile: (file: File) =>
        set(() => ({
            validFile: true,
            file,
            fileName: file.name,
            slidesGenerated: false,
            videoGenerated: false,
        })),
    setInvalidFile: () =>
        set(() => ({
            validFile: false,
            file: undefined,
            fileName: "",
            slidesGenerated: false,
            videoGenerated: false,
        })),
    setSlidesGenerated: (status: boolean) =>
        set(() => ({ slidesGenerated: status })),
    setVideoGenerated: (status: boolean) =>
        set(() => ({ videoGenerated: status })),
}));

export default useFileStore;
