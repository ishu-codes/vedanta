import { Route, Routes } from "react-router-dom";
import { About, Generate, Header, Home } from "./components";
import { SystemIcons } from "./icons";
import "./App.css";

export default function App() {
    return (
        <div className="w-full min-h-screen container">
            <SystemIcons />
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/generate" element={<Generate />} />
                <Route path="/about" element={<About />} />
            </Routes>
            {/* <div className="container w-full min-h-screen absolute top-0"></div> */}
        </div>
    );
}
