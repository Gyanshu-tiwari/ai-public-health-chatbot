import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppProvider";
import toast from "react-hot-toast";
import api from "../../utils/api";

import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ChevronLeft,
  AlertCircle,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const { setToken } = useAppContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  try {
    const { data } = await api.post("/api/auth/register", {
      name,
      email,
      password,
    });

    if (data?.success && data?.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);

      toast.success("Account created successfully");
      navigate("/chat", { replace: true });
    } else {
      toast.error(data?.message || "Registration failed");
    }
  } catch (err) {
    const msg =
      err.response?.data?.message ||
      err.response?.data?.error ||
      err.message;

    setError(msg);
    toast.error(msg);
  } finally {
    setIsLoading(false);
  }
};



  return (
    <div className="min-h-screen bg-[#0B0C10] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Back */}
      <Link to="/" className="absolute top-8 left-8">
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-slate-400 hover:text-white"
        >
          <ChevronLeft size={18} />
          Back to site
        </motion.span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px]"
      >
        <h1 className="text-2xl font-bold text-white mb-2">
          Create account
        </h1>
        <p className="text-slate-400 mb-6">
          Join Aetheris and start your health journey.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-5"
        >
          {/* Name */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/30 text-white outline-none"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/30 text-white outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-12 pr-12 py-3 rounded-xl bg-black/30 text-white outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 text-red-400 text-sm"
              >
                <AlertCircle size={16} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            {isLoading ? "Creating..." : "Create Account"}
            <ArrowRight size={18} />
          </button>
        </form>

        <p className="text-slate-400 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-white underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
