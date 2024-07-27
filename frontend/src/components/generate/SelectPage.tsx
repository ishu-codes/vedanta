import { useProgressStore } from "../../store";

const options = [
    { name: "Slides", icon: "slides" },
    { name: "Video", icon: "video" },
];

export default function SelectPage() {
    const [outputs, toggleOutput, setCurrentState] = useProgressStore(
        (state) => [
            state.outputs,
            state.toggleOutputChoice,
            state.setCurrentState,
        ]
    );
    return (
        <div className="byteContainer flex flex-col items-center mx-auto py-12 px-8 md:px-20 bg-translucent-normal border border-[#ffffff1c] rounded-lg space-y-16">
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-medium">Select</h1>
                <p className="text-secondary">Choose what you wanna generate</p>
            </div>
            <div className="flex gap-4 md:gap-12 items-center">
                {options.map((option, index) => (
                    <button
                        className={`px-4 py-2 rounded-lg border-2 space-y-2 ${
                            outputs.includes(option.name)
                                ? "border-[#ffffff8c]"
                                : "border-translucent-hard"
                        }`}
                        onClick={() => toggleOutput(option.name)}
                        key={index}
                    >
                        <svg className="w-20 md:w-26 h-20 md:h-26">
                            <use xlinkHref={`#${option.icon}`}></use>
                        </svg>
                        <p className="text-secondary">{option.name}</p>
                    </button>
                ))}
            </div>
            <button
                className="text-lg px-3 py-1 font-medium bg-offWhite text-offBlack rounded-lg"
                onClick={() => setCurrentState("Customize")}
            >
                Next
            </button>
        </div>
    );
}
