import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Play, MoreHorizontal } from "lucide-react";
import { useState } from "react";
const PlaylistCard = ({ playlist, index = 0 }) => {
    const [hovered, setHovered] = useState(false);
    return (_jsx(motion.div, { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.07, type: "spring", stiffness: 280, damping: 28 }, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, onHoverStart: () => setHovered(true), onHoverEnd: () => setHovered(false), className: "group cursor-pointer", children: _jsxs("div", { className: "glass-card rounded-2xl overflow-hidden transition-all duration-400", style: {
                boxShadow: hovered
                    ? "0 0 25px rgba(0,229,255,0.12), inset 0 1px 1px rgba(255,255,255,0.05)"
                    : "inset 0 1px 1px rgba(255,255,255,0.05), 0 8px 24px -8px rgba(0,0,0,0.5)",
            }, children: [_jsxs("div", { className: "relative aspect-square overflow-hidden", children: [_jsx("img", { src: playlist.cover, alt: playlist.name, className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" }), _jsxs(motion.div, { animate: { opacity: hovered ? 1 : 0 }, className: "absolute inset-0 flex items-end justify-between p-3", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/40 flex items-center justify-center shadow-glow-cyan", children: _jsx(Play, { className: "w-4 h-4 text-primary ml-0.5", fill: "currentColor" }) }), _jsx("button", { className: "w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center", children: _jsx(MoreHorizontal, { className: "w-4 h-4 text-white/70" }) })] })] }), _jsxs("div", { className: "p-3", children: [_jsx("p", { className: "text-sm font-semibold text-white/90 truncate", children: playlist.name }), _jsx("p", { className: "text-xs text-white/40 truncate mt-0.5", children: playlist.description }), _jsxs("p", { className: "text-xs text-white/25 font-mono mt-1.5", children: [playlist.songCount, " songs"] })] })] }) }));
};
export default PlaylistCard;
