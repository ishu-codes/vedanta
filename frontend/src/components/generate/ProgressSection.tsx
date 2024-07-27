import {
    UploadIcon,
    SelectIcon,
    CustomizeIcon,
    GenerateIcon,
} from "../../icons";
import { useProgressStore } from "../../store";

const checkpoints = [
    { name: "Upload", icon: UploadIcon },
    { name: "Select", icon: SelectIcon },
    { name: "Customize", icon: CustomizeIcon },
    { name: "Generate", icon: GenerateIcon },
];

export default function ProgressSection() {
    const [currentState, setCurrentState] = useProgressStore((state) => [
        state.currentState,
        state.setCurrentState,
    ]);

    return (
        <div className="w-full md:w-auto flex md:flex-col items-center md:items-start justify-evenly md:justify-normal md:space-y-10 md:px-12 md:pt-20">
            {checkpoints.map((checkpoint, index) => (
                <button
                    key={index}
                    className="flex flex-col md:flex-row gap-4 md:gap-4 items-center"
                    onClick={() => setCurrentState(checkpoint.name)}
                >
                    {currentState === checkpoint.name ? (
                        <div className="p-2 rounded-full bg-offWhite border border-[#FFFFFF4a]">
                            <checkpoint.icon color="#06071D" />
                        </div>
                    ) : (
                        <div className="p-2 rounded-full border border-[#FFFFFF4a]">
                            <checkpoint.icon />
                        </div>
                    )}
                    <h2 className="text-xs sm:text-base md:text-base">
                        {checkpoint.name}
                    </h2>
                </button>
            ))}
        </div>
    );
}
