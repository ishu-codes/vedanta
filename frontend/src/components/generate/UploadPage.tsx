import { ChangeEvent, DragEvent, useEffect } from "react";
import { useFileStore, useProgressStore } from "../../store";
export default function UploadPage() {
    const [isValidFile, filename, setValidFile, setInvalidFile] = useFileStore(
        (state) => [
            state.validFile,
            state.fileName,
            state.setValidFile,
            state.setInvalidFile,
        ]
    );
    const [setCurrentState] = useProgressStore((state) => [
        state.setCurrentState,
    ]);
    const handleFileUpload = (event: ChangeEvent) => {
        console.log(event);
        let element = event.currentTarget as HTMLInputElement;
        let fileList: FileList | null = element.files;

        if (fileList) {
            const file = fileList[0];
            setValidFile(file);
        } else {
            setInvalidFile();
        }
    };
    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);
        if (droppedFiles && droppedFiles.length) {
            setValidFile(droppedFiles[0]);
            console.log(droppedFiles[0].name);
        } else {
            setInvalidFile();
        }
    };

    let fileInput!: HTMLElement;

    useEffect(() => {
        fileInput = document?.querySelector("#fileUpload") as HTMLElement;
    }, [isValidFile]);

    return (
        <div
            className="byteContainer flex flex-col items-center mx-auto py-12 px-28 bg-translucent-normal border border-[#ffffff1c] rounded-lg space-y-16"
            onDragOver={(e: DragEvent<HTMLDivElement>) => e.preventDefault()}
            onDragLeave={(e: DragEvent<HTMLDivElement>) => e.preventDefault()}
            onDrop={handleDrop}
        >
            {!isValidFile ? (
                <>
                    <h1 className="text-2xl font-medium">Upload PDF</h1>
                    <svg className="w-24 h-24">
                        <use xlinkHref={`#pdf-upload`}></use>
                    </svg>
                    <input
                        className="hidden"
                        type="file"
                        id="fileUpload"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload(e)}
                    />
                    <button
                        className="text-lg px-3 py-1 font-medium bg-offWhite text-offBlack rounded-lg"
                        onClick={() => fileInput && fileInput.click()}
                    >
                        Upload
                    </button>
                </>
            ) : (
                <>
                    <h1 className="text-2xl font-medium">Upload PDF</h1>
                    <div className="flex gap-4 items-center">
                        <p>{filename}</p>
                        <button onClick={() => setInvalidFile()}>
                            <svg className="w-8 h-8">
                                <use xlinkHref="#menu-close"></use>
                            </svg>
                        </button>
                    </div>
                    <input
                        className="hidden"
                        type="file"
                        id="fileUpload"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload(e)}
                    />
                    <button
                        className="text-lg px-3 py-1 font-medium bg-offWhite text-offBlack rounded-lg"
                        onClick={() => setCurrentState("Select")}
                    >
                        Next
                    </button>
                </>
            )}
        </div>
    );
}
