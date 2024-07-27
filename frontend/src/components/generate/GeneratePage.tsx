import axios from "axios";
import { useFileStore, useProgressStore } from "../../store";
import { useState } from "react";

export default function GeneratePage() {
    const BASE_URL = `http://localhost:8000`;
    const [fileUploaded, setFileUploaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [
        isValidFile,
        file,
        filename,
        slidesGenerated,
        videoGenerated,
        setSlidesGenerated,
        setVideoGenerated,
    ] = useFileStore((state) => [
        state.validFile,
        state.file,
        state.fileName,
        state.slidesGenerated,
        state.videoGenerated,
        state.setSlidesGenerated,
        state.setVideoGenerated,
    ]);
    const [outputForms, selectedTheme, setCurrentState] = useProgressStore(
        (state) => [state.outputs, state.currentTheme, state.setCurrentState]
    );

    const choices = [
        { title: "File", isList: false, state: filename, section: "Upload" },
        {
            title: "Output",
            isList: true,
            state: outputForms.join(", "),
            section: "Select",
        },
        {
            title: "Theme",
            isList: false,
            state: selectedTheme,
            section: "Customize",
        },
    ];

    const ensureFileUploaded = () => {
        if (fileUploaded) return;

        const formData = new FormData();
        formData.append("file", file || "");
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        // setLoading(true);
        axios
            .post(`${BASE_URL}/upload_pdf/`, formData, config)
            .then((response) => {
                setFileUploaded(true);
                // setPdfUploaded(true);
                // excuteRequest(path, method);
            })
            .catch((error) => {
                console.error("Error uploading file:", error);
            });
    };

    const handleGenerate = () => {
        ensureFileUploaded();

        const formData = {
            theme: selectedTheme,
        };

        setLoading(true);
        if (outputForms.length == 2) {
            axios
                .post(`${BASE_URL}/get_presentation/`, formData)
                .then((slidesResponse) => {
                    setSlidesGenerated(true);
                    axios
                        .post(`${BASE_URL}/generate_video/`, formData)
                        .then((videoResponse) => {
                            setVideoGenerated(true);
                            setLoading(false);
                        });
                })
                .catch((error) => {
                    console.error("Error generating content:", error);
                    setLoading(false);
                });
            return;
        }

        if (outputForms[0] == "Slides") {
            axios
                .post(`${BASE_URL}/get_presentation/`, formData)
                .then((slidesResponse) => {
                    setSlidesGenerated(true);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error generating content:", error);
                    setLoading(false);
                });
            return;
        }
        axios
            .post(`${BASE_URL}/generate_video/`, formData)
            .then((videoResponse) => {
                setVideoGenerated(true);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error generating content:", error);
                setLoading(false);
            });
    };

    return (
        <div className="byteContainer flex flex-col items-center mx-auto py-12 px-8 md:px-20 bg-translucent-normal border border-[#ffffff1c] rounded-lg space-y-10">
            <h1 className="text-2xl font-medium">Generate</h1>
            <div className="space-y-2">
                <div className="flex flex-col space-y-6">
                    {choices.map((option, index) => (
                        <div className="flex flex-col space-y-2" key={index}>
                            <p className="text-md">{option.title}</p>
                            <button
                                className={`flex items-center gap-4 px-4 py-2 rounded-lg border-2 border-[#ffffff1c] text-left [&:hover>svg]:opacity-100`}
                                onClick={() => setCurrentState(option.section)}
                            >
                                <p className="w-full min-w-40 md:min-w-60 text-left text-secondary text-xs">
                                    {option.state}
                                </p>
                                <svg className="w-6 h-6 opacity-0">
                                    <use xlinkHref="#edit"></use>
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {isValidFile ? (
                <button
                    className="text-xl font-semibold px-[.1rem] py-[.1rem] bgGradient rounded-lg"
                    onClick={() => handleGenerate()}
                >
                    <p className="w-full px-3 py-1 bg-offBlack rounded-lg">
                        <span className="textGradient">Generate</span>
                    </p>
                </button>
            ) : (
                <button
                    disabled
                    className="text-xl font-semibold px-[.1rem] py-[.1rem] bg-secondary rounded-lg"
                >
                    <p className="w-full px-3 py-1 bg-offBlack rounded-lg">
                        <span className="text-secondary">Generate</span>
                    </p>
                </button>
            )}
        </div>
    );
}
