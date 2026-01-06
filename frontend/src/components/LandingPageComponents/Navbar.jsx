import React from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = ({ isMenuOpen, setIsMenuOpen, scrolled }) => (
  <motion.nav
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
    className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-4 ${
      scrolled
        ? "bg-[#0B0C10]/80 backdrop-blur-lg border-b border-white/5"
        : "bg-transparent"
    }`}
  >
    <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-emerald-400 rounded-xl rotate-12 shadow-lg shadow-indigo-500/20" />

        <span className="font-bold text-2xl tracking-tight text-white">
          Aetheris
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {["Features", "Reviews", "Pricing"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            {item}
          </a>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-4">
        <Link
          to="/login"
          className="text-sm font-semibold text-slate-300 hover:text-white transition-colors"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="bg-indigo-600/90 hover:bg-indigo-500 backdrop-blur-md text-white px-6 py-2.5 rounded-xl border border-indigo-400/30 text-sm font-bold shadow-lg shadow-indigo-500/20 transition-all"
        >
          Get Started
        </Link>
      </div>

      <button
        className="md:hidden text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </div>
  </motion.nav>
);

export default Navbar;
