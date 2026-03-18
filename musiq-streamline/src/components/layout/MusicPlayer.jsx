import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart, Shuffle, Repeat, ListMusic } from "lucide-react";
import Equalizer from "@/components/music/Equalizer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const MusicPlayer = ({ currentSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(34);
  const [volume, setVolume] = useState(72);
  const [muted, setMuted] = useState(false);
  const [liked, setLiked] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  
  const progressRef = useRef(null);

  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleProtectedAction = () => {
    if (!isAuthenticated) {
      toast("Authentication Required", {
        description: "Please log in to use premium features like saving to your library.",
        action: {
          label: "Log In",
          onClick: () => navigate("/login"),
        },
      });
      return false;
    }
    return true;
  };

  const song = currentSong || {
    title: "Neon Labyrinth",
    artist: "Daft Punk",
    cover: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=300&h=300&fit=crop",
    duration: "4:32",
    album: "Discovery",
    liked: false,
    id: "1",
    plays: "12.4M",
  };
  const currentTime = "1:34";
  const progressPercent = progress;

  const handleProgressClick = (e) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setProgress((x / rect.width) * 100);
  };

  return (
    <motion.div
      initial={{ y: 96 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-0 left-0 right-0 z-50 h-24"
      style={{
        background: "rgba(11,15,20,0.95)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow: "0 -4px 40px rgba(0,0,0,0.5)",
      }}
    >
      <div
        ref={progressRef}
        onClick={handleProgressClick}
        className="absolute top-0 left-0 right-0 h-[3px] cursor-pointer group"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <motion.div
          className="h-full glow-track relative"
          style={{ width: `${progressPercent}%` }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-glow-cyan opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ right: "-6px" }}
          />
        </motion.div>
      </div>

      <div className="flex items-center h-full px-3 sm:px-4 lg:px-6 gap-3 sm:gap-4">
        <div className="flex items-center gap-3 flex-1 sm:flex-none sm:w-[280px] min-w-0">
          <div className="relative flex-shrink-0">
            <motion.img
              key={song.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={song.cover}
              alt={song.title}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover"
            />
            <AnimatePresence>
              {isPlaying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute -bottom-1 -right-1 bg-obsidian rounded-md p-0.5"
                >
                  <Equalizer isPlaying={isPlaying} size="sm" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white/90 truncate">{song.title}</p>
            <p className="text-xs text-white/40 truncate">{song.artist}</p>
          </div>
          <button
            onClick={() => {
              if (handleProtectedAction()) setLiked(!liked);
            }}
            className={`flex-shrink-0 transition-all duration-200 ${
              liked ? "text-accent" : "text-white/30 hover:text-white/60"
            }`}
          >
            <Heart className="w-4 h-4" fill={liked ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="hidden sm:flex flex-1 flex-col items-center gap-2 max-w-lg mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (handleProtectedAction()) setShuffle(!shuffle);
              }}
              className={`transition-all duration-200 ${
                shuffle ? "text-primary" : "text-white/30 hover:text-white/60"
              }`}
            >
              <Shuffle className="w-4 h-4" />
            </button>
            <button className="text-white/50 hover:text-white/80 transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: isPlaying
                  ? "linear-gradient(135deg, #00E5FF, #00B8D4)"
                  : "rgba(0,229,255,0.15)",
                border: "1px solid rgba(0,229,255,0.4)",
                boxShadow: isPlaying ? "0 0 16px rgba(0,229,255,0.4)" : "none",
              }}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-obsidian" fill="currentColor" />
              ) : (
                <Play className="w-4 h-4 text-primary ml-0.5" fill="currentColor" />
              )}
            </motion.button>
            <button className="text-white/50 hover:text-white/80 transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                if (handleProtectedAction()) setRepeat(!repeat);
              }}
              className={`transition-all duration-200 ${
                repeat ? "text-primary" : "text-white/30 hover:text-white/60"
              }`}
            >
              <Repeat className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-white/30 font-mono w-8 text-right">{currentTime}</span>
            <div className="flex-1 h-0.5 bg-white/10 rounded-full overflow-visible" />
            <span className="text-xs text-white/30 font-mono w-8">{song.duration}</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 w-[200px] justify-end flex-shrink-0">
          <button 
            onClick={() => handleProtectedAction()}
            className="text-white/30 hover:text-white/60 transition-colors"
          >
            <ListMusic className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMuted(!muted)}
            className="text-white/40 hover:text-white/70 transition-colors"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <div className="flex items-center gap-2 w-24">
            <div
              className="flex-1 h-1 bg-white/10 rounded-full relative cursor-pointer group"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setVolume(Math.round(((e.clientX - rect.left) / rect.width) * 100));
              }}
            >
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${muted ? 0 : volume}%`,
                  background: "rgba(0,229,255,0.6)",
                }}
              />
            </div>
            <span className="text-xs text-white/25 font-mono w-5">{muted ? "0" : volume}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-accent/30 bg-accent/10">
            <div className="w-1.5 h-1.5 rounded-full bg-accent status-pulse" />
            <span className="text-xs text-accent font-medium">Synced</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MusicPlayer;
