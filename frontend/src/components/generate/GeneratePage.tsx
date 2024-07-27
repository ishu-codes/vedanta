import { useFileStore, useProgressStore } from "../../store";

export default function GeneratePage() {
    const [isValidFile, filename] = useFileStore((state) => [
        state.validFile,
        state.fileName,
    ]);
    const [outputsForms, selectedTheme, setCurrentState] = useProgressStore(
        (state) => [state.outputs, state.currentTheme, state.setCurrentState]
    );

    const choices = [
        { title: "File", isList: false, state: filename, section: "Upload" },
        {
            title: "Output",
            isList: true,
            state: outputsForms.join(", "),
            section: "Select",
        },
        {
            title: "Theme",
            isList: false,
            state: selectedTheme,
            section: "Customize",
        },
    ];

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
                    onClick={() => setCurrentState("Generate")}
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
