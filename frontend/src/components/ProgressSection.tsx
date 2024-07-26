import { UploadIcon, SelectIcon, CustomizeIcon, GenerateIcon } from "../icons";

const checkpoints = [
    { name: "Upload", icon: UploadIcon },
    { name: "Select", icon: SelectIcon },
    { name: "Customize", icon: CustomizeIcon },
    { name: "Generate", icon: GenerateIcon },
];

export default function ProgressSection() {
    return (
        <div className="md:w-full flex md:flex-col items-center md:items-start justify-evenly md:space-y-10 md:px-12 pt-8 md:pt-24">
            {checkpoints.map((checkpoint, index) => (
                <button
                    key={index}
                    className="flex flex-col md:flex-row gap-4 md:gap-4 items-center"
                >
                    <div className="p-2 rounded-full border border-[#FFFFFF4a]">
                        {/* <svg className="w-8 h-8">
                            <use xlinkHref={`#${checkpoint.icon}`}></use>
                        </svg> */}
                        <checkpoint.icon />
                    </div>
                    <h2 className="text-xs sm:text-base md:text-base">
                        {checkpoint.name}
                    </h2>
                </button>
            ))}
        </div>
    );
}
