import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";

const OTPInput = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [disabled, setDisabled] = useState(true);

  const inputsRef = useRef([]);

  /* Redirect if email missing */
  useEffect(() => {
    if (!email) navigate("/forget-password");
  }, [email, navigate]);

  /* TIMER */
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(interval);
          setDisabled(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /* INPUT CHANGE */
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  /* BACKSPACE */
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1].focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  /* PASTE OTP */
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (!pasted) return;

    const pastedOtp = pasted.split("");
    const newOtp = ["", "", "", ""];

    pastedOtp.forEach((char, i) => {
      newOtp[i] = char;
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = char;
      }
    });

    setOtp(newOtp);
    inputsRef.current[pastedOtp.length - 1]?.focus();
  };

  /* VERIFY OTP */
  const verifyOTP = async () => {
    try {
      const { data } = await api.post("/api/auth/verify-otp", {
        recipient_email: email,
        otp: otp.join(""),
      });

      if (data.success) {
        toast.success("OTP verified");
        navigate("/reset-password", { state: { email } });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid or expired OTP");
    }
  };

  /* RESEND OTP */
  const resendOTP = async () => {
    if (disabled) return;
    try {
      await api.post("/api/auth/send-otp", {
        recipient_email: email,
      });
      toast.success("OTP resent");
      setTimer(60);
      setDisabled(true);
    } catch {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] flex items-center justify-center">
      <div className="bg-white/5 p-8 rounded-3xl max-w-md w-full text-center">
        <h1 className="text-xl font-bold text-white mb-2">Verify OTP</h1>
        <p className="text-slate-400 text-sm mb-6">
          Code sent to <span className="text-white">{email}</span>
        </p>

        {/* OTP INPUTS */}
        <div
          className="flex justify-center gap-4 mb-6"
          onPaste={handlePaste}
        >
          {otp.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-14 h-14 text-xl text-center rounded-xl bg-black/40 text-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ))}
        </div>

        <button
          onClick={verifyOTP}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-semibold"
        >
          Verify OTP
        </button>

        <div className="mt-4 text-sm text-slate-400">
          {disabled ? (
            <span>Resend OTP in {timer}s</span>
          ) : (
            <button
              onClick={resendOTP}
              className="text-indigo-400 hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPInput;
