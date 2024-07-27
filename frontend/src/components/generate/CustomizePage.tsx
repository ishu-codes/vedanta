import { useProgressStore } from "../../store";

const themes = [
    { name: "Auto", icon: "themeAuto" },
    { name: "Theme1", icon: "theme1" },
    { name: "Theme2", icon: "theme2" },
    { name: "Theme3", icon: "theme3" },
    { name: "Theme4", icon: "theme4" },
    { name: "Theme5", icon: "theme5" },
];

export default function CustomizePage() {
    const [currentTheme, setCurrentTheme, setCurrentState] = useProgressStore(
        (state) => [
            state.currentTheme,
            state.setCurrentTheme,
            state.setCurrentState,
        ]
    );
    return (
        <div className="byteContainer flex flex-col items-center mx-auto py-12 px-8 md:px-20 bg-translucent-normal border border-[#ffffff1c] rounded-lg space-y-10">
            <h1 className="text-2xl font-medium">Customize</h1>
            <div className="space-y-2">
                <p className="text-xl">Themes</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-4 items-center">
                    {themes.map((option, index) => (
                        <button
                            className={`px-4 py-2 rounded-lg border-2 space-y-2 ${
                                currentTheme === option.name
                                    ? "border-[#ffffff8c]"
                                    : "border-translucent-hard"
                            }`}
                            onClick={() => setCurrentTheme(option.name)}
                            key={index}
                        >
                            <svg className="w-20 md:w-26 h-20 md:h-26">
                                <use xlinkHref={`#${option.icon}`}></use>
                            </svg>
                            <p className="text-secondary text-xs">
                                {option.name}
                            </p>
                        </button>
                    ))}
                </div>
            </div>
            <button
                className="text-lg px-3 py-1 font-medium bg-offWhite text-offBlack rounded-lg"
                onClick={() => setCurrentState("Generate")}
            >
                Next
            </button>
        </div>
    );
}
