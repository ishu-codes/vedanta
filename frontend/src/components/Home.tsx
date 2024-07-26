import { Link } from "react-router-dom";
export default function Home() {
    return (
        <main className="w-full flex flex-col pt-12 pb-6 px-2">
            <div className="w-full flex flex-col items-center text-center mt-16 px-6">
                <div className="font-bold text-[2.7rem] md:text-[3.5rem]">
                    <h1 className="bgGradient">Supercharge your docs</h1>
                    <h1 className="mt-2">with the power of AI</h1>
                </div>
                <p className="mt-8 text-secondary">
                    Generate awesome slides & video with AI in just few clicks
                </p>
                <div className="flex gap-8 mt-12 text-lg">
                    <button className="px-4 py-3 bg-offBlack border border-offWhite rounded-lg">
                        Explore
                    </button>
                    <Link
                        to="/generate"
                        className="px-4 py-3 bg-offWhite text-offBlack font-medium rounded-lg"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </main>
    );
}