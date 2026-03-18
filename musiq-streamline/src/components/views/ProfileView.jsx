import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User, Mail, Calendar, LogOut, Heart, ListMusic, Loader2 } from "lucide-react";
import { logout, updateUserProfile } from "@/features/auth/authSlice";

const ProfileView = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", email: "" });

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleEditClick = () => {
    setEditForm({ name: user.name, email: user.email });
    setIsEditing(true);
  };

  const handleSave = async () => {
    await dispatch(updateUserProfile(editForm));
    setIsEditing(false);
  };

  if (!user) return null;

  const joinDate = user.createdAt 
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Unknown';

  return (
    <div className="max-w-4xl mx-auto pb-20">
      {/* Header section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mt-4 mb-12">
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-indigo-600 flex items-center justify-center text-4xl md:text-6xl font-bold text-white shadow-xl flex-shrink-0 border-4 border-white/5">
          {user.name.charAt(0).toUpperCase()}
        </div>
        
        <div className="flex flex-col items-center md:items-start flex-1 w-full text-center md:text-left mt-2 md:mt-4">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase mb-2">Profile</p>
          
          {isEditing ? (
            <div className="w-full max-w-sm space-y-3 mb-4">
              <div>
                <label className="text-xs text-white/50 mb-1 block">Full Name</label>
                <input 
                  value={editForm.name} 
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition" 
                />
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1 block">Email Address</label>
                <input 
                  value={editForm.email} 
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition" 
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={handleSave} disabled={loading} className="px-5 py-2 bg-primary text-obsidian rounded-lg font-bold text-sm hover:scale-105 transition flex items-center gap-2">
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />} Save Changes
                </button>
                <button onClick={() => setIsEditing(false)} className="px-5 py-2 bg-white/10 text-white hover:bg-white/20 rounded-lg font-medium text-sm transition">Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-none mb-4">
                {user.name}
              </h1>
              <div className="flex items-center gap-6 text-white/50 text-sm">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4" /> {user.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" /> Joined {joinDate}
                </span>
              </div>
            </>
          )}

          <button 
            onClick={handleLogout}
            className="mt-6 px-6 py-2 rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      {/* Stats sections (UI mock for demonstration) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 transition-colors hover:bg-white/10">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-red-500/10 rounded-xl text-red-400">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">124</p>
              <p className="text-sm text-white/50">Liked Songs</p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 transition-colors hover:bg-white/10">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <ListMusic className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">8</p>
              <p className="text-sm text-white/50">Public Playlists</p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings section */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6">Account Settings</h2>
        <div className="space-y-2">
          {["Edit Profile", "Notification Preferences", "Privacy Settings", "Subscription Plan"].map((setting) => (
            <button 
              key={setting} 
              onClick={setting === "Edit Profile" ? handleEditClick : undefined}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/5 transition-all text-left"
            >
              <span className="text-sm font-medium text-white/90">{setting}</span>
              <span className="text-xs text-white/30 truncate">Manage</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
