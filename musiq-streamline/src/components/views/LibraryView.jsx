import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ListMusic, Heart, Plus, Grid, List, Play, Trash2, Music } from "lucide-react";
import { playlists, trendingSongs, newReleases } from "@/data/mockData";
import SongCard from "@/components/music/SongCard";
import PlaylistCard from "@/components/music/PlaylistCard";
const likedSongs = [...trendingSongs.filter((s) => s.liked), ...newReleases.filter((s) => s.liked)];
const LibraryView = ({ currentSong, onPlay }) => {
    const [tab, setTab] = useState("playlists");
    const [viewMode, setViewMode] = useState("grid");
    const [showCreate, setShowCreate] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState("");
    const [userPlaylists, setUserPlaylists] = useState(playlists);
    const handleCreate = () => {
        if (!newPlaylistName.trim())
            return;
        setUserPlaylists((prev) => [
            ...prev,
            {
                id: `p${Date.now()}`,
                name: newPlaylistName,
                songCount: 0,
                cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop",
                description: "New playlist",
            },
        ]);
        setNewPlaylistName("");
        setShowCreate(false);
    };
    return (_jsxs("div", { className: "space-y-8 animate-fade-in", children: [_jsxs("div", { className: "flex items-end justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-white/90 tracking-tight-display mb-1", children: "Your Library" }), _jsx("p", { className: "text-sm text-white/35", children: "All your music in one place" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: () => setViewMode(viewMode === "grid" ? "list" : "grid"), className: "w-9 h-9 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-white/50 hover:text-white/80", children: viewMode === "grid" ? _jsx(List, { className: "w-4 h-4" }) : _jsx(Grid, { className: "w-4 h-4" }) }), _jsxs("button", { onClick: () => setShowCreate(true), className: "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all", style: {
                                    background: "rgba(0,229,255,0.1)",
                                    border: "1px solid rgba(0,229,255,0.25)",
                                    color: "#00E5FF",
                                }, children: [_jsx(Plus, { className: "w-4 h-4" }), "New Playlist"] })] })] }), _jsx(AnimatePresence, { children: showCreate && (_jsxs(motion.div, { initial: { opacity: 0, y: -12, scale: 0.97 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -12, scale: 0.97 }, className: "rounded-2xl p-5 max-w-md", style: {
                        background: "rgba(18,24,33,0.95)",
                        border: "1px solid rgba(0,229,255,0.2)",
                        boxShadow: "0 0 24px rgba(0,229,255,0.08), inset 0 1px 1px rgba(255,255,255,0.05)",
                    }, children: [_jsx("h3", { className: "text-sm font-bold text-white/90 mb-3", children: "Create new playlist" }), _jsx("input", { type: "text", placeholder: "Playlist name...", autoFocus: true, value: newPlaylistName, onChange: (e) => setNewPlaylistName(e.target.value), onKeyDown: (e) => e.key === "Enter" && handleCreate(), className: "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/90 placeholder:text-white/25 outline-none focus:border-primary/40 transition-colors mb-3" }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: handleCreate, className: "flex-1 py-2 rounded-xl text-sm font-medium text-obsidian transition-all", style: { background: "linear-gradient(135deg, #00E5FF, #00B8D4)" }, children: "Create" }), _jsx("button", { onClick: () => { setShowCreate(false); setNewPlaylistName(""); }, className: "flex-1 py-2 rounded-xl text-sm text-white/60 border border-white/10 hover:border-white/20 transition-all", children: "Cancel" })] })] })) }), _jsx("div", { className: "flex gap-1 p-1 rounded-2xl w-fit", style: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.05)" }, children: [
                    { id: "playlists", label: "Playlists", icon: ListMusic },
                    { id: "liked", label: "Liked Songs", icon: Heart },
                    { id: "albums", label: "Albums", icon: Music },
                ].map(({ id, label, icon: Icon }) => (_jsxs("button", { onClick: () => setTab(id), className: `flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${tab === id
                        ? "bg-primary/15 text-primary border border-primary/20"
                        : "text-white/40 hover:text-white/70"}`, children: [_jsx(Icon, { className: "w-3.5 h-3.5" }), label] }, id))) }), _jsxs(AnimatePresence, { mode: "wait", children: [tab === "playlists" && (_jsx(motion.div, { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: 0.25 }, children: viewMode === "grid" ? (_jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [userPlaylists.map((pl, i) => (_jsx(PlaylistCard, { playlist: pl, index: i }, pl.id))), _jsxs(motion.button, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, onClick: () => setShowCreate(true), className: "rounded-2xl border border-dashed border-white/10 hover:border-primary/30 flex flex-col items-center justify-center gap-3 aspect-square cursor-pointer transition-all group hover:bg-primary/5", children: [_jsx("div", { className: "w-10 h-10 rounded-full border border-white/10 group-hover:border-primary/30 flex items-center justify-center transition-all", children: _jsx(Plus, { className: "w-5 h-5 text-white/30 group-hover:text-primary transition-colors" }) }), _jsx("span", { className: "text-xs text-white/30 group-hover:text-white/60 transition-colors", children: "New Playlist" })] })] })) : (_jsx("div", { className: "space-y-2", children: userPlaylists.map((pl, i) => (_jsxs(motion.div, { initial: { opacity: 0, x: -8 }, animate: { opacity: 1, x: 0 }, transition: { delay: i * 0.04 }, className: "flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 cursor-pointer group transition-all border border-transparent hover:border-white/5", children: [_jsx("img", { src: pl.cover, alt: pl.name, className: "w-12 h-12 rounded-xl object-cover" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-semibold text-white/90 truncate", children: pl.name }), _jsx("p", { className: "text-xs text-white/35 truncate", children: pl.description })] }), _jsxs("span", { className: "text-xs text-white/25 font-mono", children: [pl.songCount, " songs"] }), _jsxs("div", { className: "flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity", children: [_jsx("button", { className: "w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center", children: _jsx(Play, { className: "w-3.5 h-3.5 text-primary ml-0.5", fill: "currentColor" }) }), _jsx("button", { className: "w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-red-400", children: _jsx(Trash2, { className: "w-3.5 h-3.5" }) })] })] }, pl.id))) })) }, "playlists")), tab === "liked" && (_jsxs(motion.div, { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: 0.25 }, children: [_jsxs("div", { className: "rounded-2xl p-6 mb-5 flex items-center gap-5", style: {
                                    background: "linear-gradient(135deg, rgba(29,185,84,0.15) 0%, rgba(18,24,33,0.8) 100%)",
                                    border: "1px solid rgba(29,185,84,0.15)",
                                }, children: [_jsx("div", { className: "w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0", style: { background: "linear-gradient(135deg, #1DB954, #17A44A)" }, children: _jsx(Heart, { className: "w-8 h-8 text-white", fill: "currentColor" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-white/40 uppercase tracking-widest mb-1", children: "Playlist" }), _jsx("h2", { className: "text-xl font-bold text-white/90", children: "Liked Songs" }), _jsxs("p", { className: "text-sm text-white/40 mt-0.5 font-mono", children: [likedSongs.length, " songs"] })] }), _jsx("button", { onClick: () => likedSongs[0] && onPlay(likedSongs[0]), className: "ml-auto w-12 h-12 rounded-full flex items-center justify-center transition-all", style: {
                                            background: "linear-gradient(135deg, #1DB954, #17A44A)",
                                            boxShadow: "0 0 20px rgba(29,185,84,0.3)",
                                        }, children: _jsx(Play, { className: "w-5 h-5 text-white ml-0.5", fill: "currentColor" }) })] }), _jsx("div", { className: "space-y-1", children: likedSongs.map((song, i) => (_jsx(SongCard, { song: song, variant: "row", isPlaying: currentSong?.id === song.id, onPlay: onPlay, index: i }, song.id))) })] }, "liked")), tab === "albums" && (_jsx(motion.div, { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: 0.25 }, children: _jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4", children: [...new Set([...trendingSongs, ...newReleases].map((s) => s.album))].map((album, i) => {
                                const song = [...trendingSongs, ...newReleases].find((s) => s.album === album);
                                return (_jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.04 }, whileHover: { scale: 1.03 }, className: "cursor-pointer group", children: _jsxs("div", { className: "rounded-2xl overflow-hidden", style: {
                                            background: "rgba(18,24,33,0.8)",
                                            border: "1px solid rgba(255,255,255,0.05)",
                                            boxShadow: "inset 0 1px 1px rgba(255,255,255,0.04)",
                                        }, children: [_jsxs("div", { className: "aspect-square overflow-hidden relative", children: [_jsx("img", { src: song.cover, alt: album, className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" }), _jsx("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center", children: _jsx("div", { className: "w-10 h-10 rounded-full flex items-center justify-center", style: { background: "rgba(0,229,255,0.2)", border: "1px solid rgba(0,229,255,0.4)" }, children: _jsx(Play, { className: "w-4 h-4 text-primary ml-0.5", fill: "currentColor" }) }) })] }), _jsxs("div", { className: "p-3", children: [_jsx("p", { className: "text-xs font-semibold text-white/80 truncate", children: album }), _jsx("p", { className: "text-[10px] text-white/35 font-mono mt-1", children: song.artist })] })] }) }, album));
                            }) }) }, "albums"))] })] }));
};
export default LibraryView;
