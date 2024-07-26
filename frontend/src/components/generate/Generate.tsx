import React, { useState } from "react";
import {
    UploadIcon,
    SelectIcon,
    CustomizeIcon,
    GenerateIcon,
} from "../../icons";
import ProgressSection from "./ProgressSection";
import { useProgressStore } from "../../store";
import UploadPage from "./UploadPage";
import SelectPage from "./SelectPage";
import CustomizePage from "./CustomizePage";
import GeneratePage from "./GeneratePage";
const states = [
    { name: "Upload", page: UploadPage },
    { name: "Select", page: SelectPage },
    { name: "Customize", page: CustomizePage },
    { name: "Generate", page: GeneratePage },
];

export default function Generate() {
    const [currentState] = useProgressStore((state) => [state.currentState]);
    return (
        <main className="w-full flex flex-col md:flex-row px-4">
            <ProgressSection />
            <div className="flex-grow flex flex-col pt-20">
                {states.map((state, index) => (
                    <React.Fragment key={index}>
                        {currentState === state.name && <state.page />}
                    </React.Fragment>
                ))}
            </div>
        </main>
    );
}