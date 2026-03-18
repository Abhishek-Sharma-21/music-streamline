import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { Home, Search, Library, Heart, ListMusic, Plus, Radio, TrendingUp, Mic2 } from "lucide-react";
const musiqLogo = "/placeholder.svg";
const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "search", label: "Search", icon: Search },
    { id: "library", label: "Library", icon: Library },
    { id: "trending", label: "Trending", icon: TrendingUp },
    { id: "radio", label: "Radio", icon: Radio },
];
const libraryItems = [
    { id: "liked", label: "Liked Songs", icon: Heart },
    { id: "playlists", label: "My Playlists", icon: ListMusic },
    { id: "artists", label: "Artists", icon: Mic2 },
];
const Sidebar = ({ activeSection, onNavigate, variant = "fixed" }) => {
    return (_jsxs(motion.aside, { initial: { x: -20, opacity: 0 }, animate: { x: 0, opacity: 1 }, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }, className: variant === "fixed"
            ? "fixed left-0 top-0 bottom-0 w-[260px] flex flex-col z-40"
            : "h-full w-full flex flex-col", style: {
            background: "rgba(11, 15, 20, 0.95)",
            borderRight: "1px solid rgba(255,255,255,0.05)",
        }, children: [_jsxs("div", { className: "flex items-center gap-3 px-6 py-6 flex-shrink-0", children: [_jsx("img", { src: musiqLogo, alt: "Musiq", className: "w-8 h-8 object-contain" }), _jsx("span", { className: "text-white font-bold text-xl tracking-tight-display", children: "Musiq" })] }), _jsxs("nav", { className: "flex-1 overflow-y-auto scrollbar-hide px-3", children: [_jsx("div", { className: "mb-6", children: navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeSection === item.id;
                            return (_jsxs("button", { onClick: () => onNavigate(item.id), className: `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200 group relative ${isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-white/50 hover:text-white/80 hover:bg-white/5"}`, children: [isActive && (_jsx(motion.div, { layoutId: "sidebar-active", className: "absolute inset-0 rounded-xl bg-primary/10", style: { boxShadow: "inset 0 0 0 1px rgba(0,229,255,0.2)" } })), _jsx(Icon, { className: `w-5 h-5 relative z-10 transition-all duration-200 ${isActive ? "text-primary" : "group-hover:text-white/80"}` }), _jsx("span", { className: `text-sm font-medium tracking-sidebar relative z-10 ${isActive ? "text-primary" : ""}`, children: item.label }), isActive && (_jsx("div", { className: "absolute right-3 w-1.5 h-1.5 rounded-full bg-primary shadow-glow-cyan z-10" }))] }, item.id));
                        }) }), _jsxs("div", { className: "mb-4", children: [_jsx("p", { className: "text-white/25 text-xs font-semibold tracking-widest uppercase px-3 mb-2", children: "Your Library" }), libraryItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeSection === item.id;
                                return (_jsxs("button", { onClick: () => onNavigate(item.id), className: `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200 group relative ${isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-white/50 hover:text-white/80 hover:bg-white/5"}`, children: [isActive && (_jsx(motion.div, { layoutId: "sidebar-lib-active", className: "absolute inset-0 rounded-xl bg-primary/10", style: { boxShadow: "inset 0 0 0 1px rgba(0,229,255,0.2)" } })), _jsx(Icon, { className: `w-4 h-4 relative z-10 ${isActive ? "text-primary" : ""}` }), _jsx("span", { className: `text-sm relative z-10 ${isActive ? "text-primary font-medium" : ""}`, children: item.label })] }, item.id));
                            })] }), _jsxs("button", { onClick: () => onNavigate("playlists"), className: "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/5 transition-all duration-200 border border-dashed border-white/10 hover:border-primary/30 mt-2", children: [_jsx(Plus, { className: "w-4 h-4" }), _jsx("span", { className: "text-sm", children: "Create Playlist" })] }), _jsxs("div", { className: "mt-6", children: [_jsx("p", { className: "text-white/25 text-xs font-semibold tracking-widest uppercase px-3 mb-2", children: "Recent" }), ["Synthwave Drive", "Deep Focus", "Cyberpunk Vibes"].map((name) => (_jsxs("button", { className: "w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-0.5 text-white/35 hover:text-white/60 hover:bg-white/5 transition-all duration-200", children: [_jsx("div", { className: "w-8 h-8 rounded-lg bg-white/5 flex-shrink-0" }), _jsx("span", { className: "text-xs truncate", children: name })] }, name)))] })] }), _jsx("div", { className: "px-4 py-4 border-t border-white/5 flex-shrink-0", children: _jsxs("div", { className: "flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 cursor-pointer transition-all", children: [_jsxs("div", { className: "relative", children: [_jsx("img", { src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop&crop=face", alt: "User", className: "w-8 h-8 rounded-full object-cover" }), _jsx("div", { className: "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-accent border-2 border-obsidian" })] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-medium text-white/90 truncate", children: "Alex Nova" }), _jsx("p", { className: "text-xs text-white/35 truncate", children: "Premium" })] })] }) })] }));
};
export default Sidebar;
