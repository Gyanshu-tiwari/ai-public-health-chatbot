import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => {
  const location = useLocation();

  const navLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Chats', path: '/chat/default' },
    { name: 'Profile', path: '/profile' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="top-0 left-0 right-0 z-[100] ">
      <div className=" w-full h-16 bg-gradient-to-tr from-slate-800/40 to-neutral-900 flex items-center justify-between border border-white/5 px-10">
        
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg rotate-12 group-hover:rotate-0 transition-transform duration-300 shadow-lg shadow-indigo-500/20" />
          <span className="font-bold text-xl tracking-tight text-white">Aetheris</span>
        </Link>

        {/* Center: Nav Items (Visible only if isLoggedIn) */}
        <div className="hidden md:flex items-center gap-1">
          <AnimatePresence>
            {isLoggedIn && (
              <motion.ul 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-8"
              >
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path}
                      className={`text-sm font-medium transition-colors hover:text-indigo-400 ${
                        location.pathname === link.path ? 'text-indigo-400' : 'text-slate-400'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Auth / Contact Action */}
        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/5 hover:bg-white/10 text-white px-5 py-2 rounded-xl border border-white/10 text-sm font-semibold transition-all"
            >
              Contact Us
            </motion.button>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
                Login
              </Link>
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(79, 70, 229, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600/80 backdrop-blur-md text-white px-6 py-2 rounded-xl border border-indigo-400/50 text-sm font-bold shadow-lg shadow-indigo-500/20"
              >
                Signup
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;