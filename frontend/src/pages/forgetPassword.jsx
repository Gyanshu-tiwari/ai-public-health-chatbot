import React, { useState } from "react";
import { motion } from "framer-motion";
import api from "../utils/api";
import { Mail, ArrowRight, ChevronLeft, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { data } = await api.post("/api/auth/send-otp", {
        recipient_email: email, // ✅ FIXED
      });

      if (data.success) {
        toast.success(data.message || "OTP sent to your email");
        navigate("/otp-input", { state: { email } });
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || "User not found";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] flex items-center justify-center p-6">
      <Link
        to="/login"
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-400"
      >
        <ChevronLeft size={18} /> Back
      </Link>

      <motion.div className="w-full max-w-[420px]">
        <h1 className="text-2xl font-bold text-white mb-2">
          Forgot password
        </h1>
        <p className="text-slate-400 mb-6 text-sm">
          Enter your email to receive a verification code
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 bg-white/5 p-8 rounded-3xl"
        >
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full pl-12 py-3 bg-black/30 text-white rounded-xl outline-none"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <button
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl flex justify-center items-center gap-2 font-semibold"
          >
            {isLoading ? "Sending..." : "Send OTP"}
            <ArrowRight size={16} />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgetPassword;
