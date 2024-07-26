import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";

const navLinks = [
    { name: "Home", url: "/" },
    { name: "Generate", url: "/generate" },
    { name: "About", url: "/about" },
];

export default function Header() {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const location = useLocation();
    return (
        <>
            <header
                className="w-full px-4 md:px-8 py-3 bg-translucent-normal border-b border-[#ffffff0f] flex items-center justify-between z-20"
                style={{ backdropFilter: "blur(8px)" }}
            >
                <picture className="h-full">
                    <img className="h-full" src={logo} alt="logo" />
                </picture>
                <nav className="hidden md:flex space-x-10 px-8 py-3 bg-translucent-normal border border-[#ffffff1f] rounded-xl">
                    {navLinks.map((link, index) => (
                        <Link
                            className={`${
                                location.pathname === link.url
                                    ? "active"
                                    : "text-inactive"
                            }`}
                            to={link.url}
                            key={index}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
                <Link
                    className={`hidden md:block px-6 py-2 bg-translucent-hard border border-[#ffffff1f] rounded-xl ${
                        location.pathname.includes("generate")
                            ? "opacity-0 -z-10"
                            : ""
                    }`}
                    to="/generate"
                >
                    Get Started
                </Link>

                <button
                    className="md:hidden py-2 px-2"
                    onClick={() => setNavbarOpen(!navbarOpen)}
                >
                    {navbarOpen ? (
                        <svg className="w-8 h-8">
                            <use xlinkHref="#menu-close"></use>
                        </svg>
                    ) : (
                        <svg className="w-8 h-8">
                            <use xlinkHref="#menu-open"></use>
                        </svg>
                    )}
                </button>
            </header>

            {navbarOpen && (
                <nav
                    className="w-full absolute flex md:hidden flex-col space-y-4 px-8 py-4 bg-translucent-hard border-b border-[#ffffff1f] z-10"
                    style={{ backdropFilter: "blur(8px)" }}
                >
                    {navLinks.map((link, index) => (
                        <Link
                            className={`${
                                location.pathname === link.url
                                    ? "active"
                                    : "text-inactive"
                            }`}
                            to={link.url}
                            key={index}
                            onClick={() => setNavbarOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            )}
        </>
    );
}
