import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Bell, 
  User, 
  LogOut, 
  Settings, 
  ChevronRight,
  ShieldCheck,
  CreditCard,
  Clock,
  CheckCircle2
} from 'lucide-react';

const Navbar = ({ isLoggedIn = true, user = { name: "Alexander Pierce", avatar: "https://i.pravatar.cc/150?u=alex" } }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Mock Notifications Data
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Consultation Request", description: "Dr. Chen is available for a follow-up session.", time: "4m ago", read: false, type: 'appointment' },
    { id: 2, title: "Lab Results Ready", description: "Your latest blood work results are now available.", time: "2h ago", read: false, type: 'health' },
    { id: 3, title: "Security Update", description: "Two-factor authentication has been enabled.", time: "5h ago", read: true, type: 'security' },
    { id: 4, title: "Sync Successful", description: "Wearable data synchronized with Apple Health.", time: "8h ago", read: true, type: 'system' },
    { id: 5, title: "Welcome to Aetheris", description: "Start by completing your health profile.", time: "1d ago", read: true, type: 'system' },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Auto-close dropdowns on click-away
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setShowProfile(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    // Increased z-index to 9999 to clear any relative stacking contexts in main content
    <nav className="sticky top-0 left-0 right-0  z-[9999] pointer-events-none">
      <div className="w-full mx-auto h-16 bg-[#0B0C10]/60 backdrop-blur-2xl border border-white/10 rounded-2xl flex items-center justify-between px-6 shadow-2xl shadow-black/40 pointer-events-auto">
        
        {/* Left: Interactive Logo */}
        <a href="/" className="flex items-center gap-3 group transition-all active:scale-95">
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:rotate-6 transition-all duration-300">
            <Activity className="text-white" size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight text-white hidden sm:block selection:bg-none">Aetheris</span>
        </a>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {isLoggedIn ? (
            <>
              {/* Notification Dialog */}
              <div className="relative" ref={notifRef}>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowProfile(false);
                  }}
                  className={`p-2.5 rounded-xl border transition-all relative ${
                    showNotifications 
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30' 
                    : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-[#0B0C10] shadow-lg animate-in fade-in zoom-in duration-300">
                      {unreadCount}
                    </span>
                  )}
                </motion.button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div 
                      initial={{ opacity: 0, y: 12, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.95 }}
                      // Extreme z-index for dropdown content to ensure it clears the main container
                      className="absolute right-0 mt-4 w-80 sm:w-96 bg-[#12141c] border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden backdrop-blur-3xl z-[10000] pointer-events-auto"
                    >
                      <div className="p-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                        <h3 className="font-bold text-white flex items-center gap-2">
                          Notifications
                          <span className="bg-white/10 text-slate-400 px-2 py-0.5 rounded-full text-[10px]">{unreadCount} New</span>
                        </h3>
                        <button className="text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors">Mark all read</button>
                      </div>
                      
                      <div className="max-h-[380px] overflow-y-auto custom-scrollbar">
                        {notifications.length > 0 ? (
                          notifications.map((n) => (
                            <div key={n.id} className="p-4 border-b border-white/5 hover:bg-white/[0.03] transition-colors cursor-pointer group">
                              <div className="flex gap-4">
                                <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${n.read ? 'bg-transparent' : 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.6)]'}`} />
                                <div className="flex-1">
                                  <div className="flex justify-between items-start mb-1">
                                    <h4 className={`text-sm font-bold leading-tight ${n.read ? 'text-slate-400' : 'text-white'}`}>{n.title}</h4>
                                    <span className="text-[10px] text-slate-500 font-medium whitespace-nowrap ml-2">{n.time}</span>
                                  </div>
                                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 group-hover:text-slate-400 transition-colors">{n.description}</p>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-12 text-center">
                            <CheckCircle2 size={32} className="mx-auto text-slate-700 mb-3" />
                            <p className="text-sm text-slate-500 font-medium">All caught up!</p>
                          </div>
                        )}
                      </div>
                      
                      <button className="w-full py-4 text-[10px] font-black text-indigo-400 hover:bg-indigo-500/10 transition-colors uppercase tracking-[0.2em] border-t border-white/5">
                        View All Activity
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Account Dropdown */}
              <div className="relative" ref={profileRef}>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowProfile(!showProfile);
                    setShowNotifications(false);
                  }}
                  className={`flex items-center gap-3 p-1 rounded-2xl border transition-all ${
                    showProfile 
                    ? 'bg-white/10 border-white/20' 
                    : 'bg-white/5 border-white/5 hover:bg-white/10'
                  }`}
                >
                  <img src={user.avatar} className="w-9 h-9 rounded-xl border border-white/10 shadow-lg object-cover" alt="User" />
                  <div className="hidden lg:block text-left pr-2">
                    <p className="text-xs font-bold text-white leading-none">{user.name.split(' ')[0]}</p>
                    <p className="text-[9px] text-emerald-400 font-black uppercase tracking-widest mt-1">Verified</p>
                  </div>
                </motion.button>

                <AnimatePresence>
                  {showProfile && (
                    <motion.div 
                      initial={{ opacity: 0, y: 12, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-64 bg-[#12141c] border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden backdrop-blur-3xl z-[10000] pointer-events-auto"
                    >
                      <div className="p-6 text-center border-b border-white/5 bg-white/[0.02]">
                         <div className="relative inline-block mb-3">
                           <img src={user.avatar} className="w-16 h-16 rounded-2xl border-2 border-indigo-500/30 mx-auto shadow-xl shadow-indigo-500/10 object-cover" alt="" />
                           <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#12141c]" />
                         </div>
                         <h4 className="font-bold text-white text-sm">{user.name}</h4>
                         <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mt-1">Free Tier</p>
                      </div>
                      
                      <div className="p-2">
                        <MenuLink icon={<Activity size={16}/>} label="My Dashboard" />
                        <MenuLink icon={<Settings size={16}/>} label="Account Settings" />
                        <MenuLink icon={<ShieldCheck size={16}/>} label="Privacy & Security" />
                        <div className="h-px bg-white/5 my-2 mx-2" />
                        <MenuLink icon={<LogOut size={16}/>} label="Sign Out" variant="danger" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            /* Logged Out State */
            <div className="flex items-center gap-6">
              <button className="text-sm font-bold text-slate-400 hover:text-white transition-colors">
                Login
              </button>
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(79, 70, 229, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl border border-indigo-400/50 text-sm font-bold transition-all shadow-lg shadow-indigo-500/10"
              >
                Sign Up
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const MenuLink = ({ icon, label, variant = "default" }) => (
  <button className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${
    variant === 'danger' ? 'hover:bg-rose-500/10 text-rose-400' : 'hover:bg-white/5 text-slate-400 hover:text-white'
  }`}>
    <div className="flex items-center gap-3">
      <div className={`${variant === 'danger' ? 'text-rose-400' : 'text-slate-500 group-hover:text-indigo-400'} transition-colors`}>
        {icon}
      </div>
      <span className="text-xs font-bold tracking-tight">{label}</span>
    </div>
    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
  </button>
);

export default Navbar;