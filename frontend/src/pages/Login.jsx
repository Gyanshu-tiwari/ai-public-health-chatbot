import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ChevronLeft,
  AlertCircle,
} from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API Call
    setTimeout(() => {
      if (email !== 'demo@aetheris.com') {
        setError('Invalid credentials. Try demo@aetheris.com');
        setIsLoading(false);
      } else {
        // Handle success
        setIsLoading(false);
      }
    }, 1500);
  };

  return (

    <div className="min-h-screen bg-[#0B0C10] flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />

      {/* Navigation Back */}
      <Link to="/" className="absolute top-8 left-8">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group"
              >
                <ChevronLeft
                  size={20}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                <span className="text-sm font-medium">Back to site</span>
              </motion.span>
            </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] relative z-10"
      >
        {/* Header Text - Now Left Aligned */}
        <div className="text-left mb-10 px-2">
          <h1 className="text-2xl font-bold text-white tracking-tight">Sign In</h1>
           <p className="text-slate-400 mt-2 text-sm leading-relaxed">
            Welcome back! Please sign in to continue
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-black/50">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Password</label>
                <Link to="/forget-password" className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-wider">Forgot?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 text-rose-400 text-sm bg-rose-400/10 p-3 rounded-xl border border-rose-400/20"
                >
                  <AlertCircle size={16} />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button 
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-500/20 group relative overflow-hidden"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-[0.2em] font-bold">
              <span className="bg-[#121318] px-4 text-slate-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login - Single Google Button */}
          <button className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 py-4 rounded-2xl transition-all group">
            <div className="p-1 bg-white rounded-md shadow-sm">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M24 12.27c0-.85-.07-1.66-.21-2.46H12v4.65h6.72c-.29 1.56-1.17 2.89-2.48 3.78v3.13h4.02c2.35-2.17 3.71-5.36 3.71-9.1z"/>
                  <path fill="#4285F4" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-4.02-3.13c-1.11.75-2.53 1.19-3.91 1.19-3.01 0-5.56-2.03-6.47-4.76H1.4v3.13C3.38 21.6 7.42 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.53 14.39c-.24-.72-.37-1.48-.37-2.39s.13-1.67.37-2.39V6.48H1.4c-.88 1.76-1.4 3.74-1.4 5.52 0 1.78.52 3.76 1.4 5.52l4.13-3.13z"/>
                  <path fill="#34A853" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.45-3.45C17.96 1.07 15.24 0 12 0 7.42 0 3.38 2.4 1.4 6.48l4.13 3.13c.91-2.73 3.46-4.76 6.47-4.76z"/>
              </svg>
            </div>
            <span className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">Sign in with Google</span>
          </button>
        </div>

        {/* Footer Link */}
        <p className="text-left mt-8 px-2 text-slate-500 text-sm font-medium">
          Don't have an account? {' '}
          <Link to="/register" className="text-white font-bold hover:text-indigo-400 transition-colors underline-offset-4 hover:underline">
            Create account
          </Link>
        </p>
      </motion.div>
    </div>
    
  );
};

export default Login;