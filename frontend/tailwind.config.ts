/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            offWhite: "#ECECEC",
            offBlack: "#06071D",
            secondary: "#9C9CB1",
            inactive: "#626372",
            translucent: {
                normal: "#FFFFFF03",
                hard: "#FFFFFF0a",
            },
            transparent: "transparent",
        },
        extend: {},
    },
    plugins: [],
};
