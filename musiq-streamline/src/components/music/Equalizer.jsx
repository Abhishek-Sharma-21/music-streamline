import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Equalizer = ({ isPlaying = true, size = "sm" }) => {
    const barWidth = size === "sm" ? "w-[3px]" : "w-[4px]";
    const baseHeight = size === "sm" ? "h-[4px]" : "h-[6px]";
    if (!isPlaying) {
        return (_jsx("div", { className: `flex items-end gap-[2px] ${size === "sm" ? "h-4" : "h-6"}`, children: [1, 2, 3, 4].map((i) => (_jsx("div", { className: `${barWidth} ${baseHeight} eq-bar rounded-sm`, style: { background: "linear-gradient(to top, #00E5FF, #00B8D4)" } }, i))) }));
    }
    return (_jsxs("div", { className: `flex items-end gap-[2px] ${size === "sm" ? "h-4" : "h-6"}`, children: [_jsx("div", { className: `${barWidth} eq-bar eq-bar-1 rounded-sm` }), _jsx("div", { className: `${barWidth} eq-bar eq-bar-2 rounded-sm` }), _jsx("div", { className: `${barWidth} eq-bar eq-bar-3 rounded-sm` }), _jsx("div", { className: `${barWidth} eq-bar eq-bar-4 rounded-sm` })] }));
};
export default Equalizer;
