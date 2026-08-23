import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const inputStyle = {
    backgroundColor: "#FCF2E5",
    color: "#524646",
    border: "1px solid #A8A492",
  };

  const focusHandlers = {
    onFocus: (e) => {
      e.target.style.borderColor = "#EC5B38";
      e.target.style.boxShadow = "0 0 0 3px rgba(236, 91, 56, 0.12)";
    },
    onBlur: (e) => {
      e.target.style.borderColor = "#A8A492";
      e.target.style.boxShadow = "none";
    },
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/SignUp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, pwd, email }),
      });
      if (res.ok) {
        setOtpSent(true);
      } else {
        const msg = await res.text();
        setError(msg || "Something went wrong, try again.");
      }
    } catch (err) {
      setError("Server not reachable.");
    } finally {
      setLoading(false);
    }
  }

  async function handleOtpVerify(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/Otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const msg = await res.text();
      if (msg === "success") {
        alert("Account created successfully!");
        navigate("/");
      } else {
        setError("Invalid or expired OTP.");
      }
    } catch (err) {
      setError("Server not reachable.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4"
      style={{ backgroundColor: "#FCF2E5", color: "#524646", fontFamily: "inherit" }}
    >
      <div
        className="w-full max-w-md rounded-3xl p-8 sm:p-10"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #A8A492",
          boxShadow: "0 18px 45px rgba(82, 70, 70, 0.10)",
        }}
      >
        {/* Header */}
        <div className="mb-8">
          <p
            className="text-xs font-semibold tracking-[3px] uppercase mb-2"
            style={{ color: "#A8A492" }}
          >
            URL Shortener
          </p>
          <h2
            className="text-3xl sm:text-4xl font-semibold leading-tight"
            style={{ color: "#524646" }}
          >
            Create account
          </h2>
          <p className="mt-2 text-sm" style={{ color: "#A8A492" }}>
            Sign up to start shortening your links.
          </p>
        </div>

        <form onSubmit={otpSent ? handleOtpVerify : handleSubmit}>
          {/* Name */}
          <label
            className="block text-xs font-semibold tracking-[1px] uppercase mb-2"
            style={{ color: "#524646" }}
          >
            Name
          </label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={otpSent}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 mb-5"
            style={inputStyle}
            {...focusHandlers}
          />

          {/* Email */}
          <label
            className="block text-xs font-semibold tracking-[1px] uppercase mb-2"
            style={{ color: "#524646" }}
          >
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={otpSent}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 mb-5"
            style={inputStyle}
            {...focusHandlers}
          />

          {/* Password */}
          <label
            className="block text-xs font-semibold tracking-[1px] uppercase mb-2"
            style={{ color: "#524646" }}
          >
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
            disabled={otpSent}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 mb-6"
            style={inputStyle}
            {...focusHandlers}
          />

          {/* OTP Section */}
          {otpSent && (
            <div className="mb-6">
              <div
                className="rounded-2xl px-4 py-3 mb-5 text-sm"
                style={{ backgroundColor: "#FCF2E5", border: "1px solid #A8A492", color: "#524646" }}
              >
                OTP sent to <strong>{email}</strong>
              </div>
              <label
                className="block text-xs font-semibold tracking-[1px] uppercase mb-2"
                style={{ color: "#524646" }}
              >
                Enter OTP
              </label>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                required
                autoFocus
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                style={inputStyle}
                {...focusHandlers}
              />
            </div>
          )}

          {/* Error */}
          {error && (
            <p
              className="mb-5 px-4 py-3 rounded-xl text-xs leading-relaxed"
              style={{
                color: "#524646",
                backgroundColor: "#FCF2E5",
                border: "1px solid #EC5B38",
              }}
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-semibold tracking-[1px] uppercase transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            style={{
              backgroundColor: "#EC5B38",
              color: "#ffffff",
              boxShadow: "0 8px 20px rgba(236, 91, 56, 0.20)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#524646";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(82, 70, 70, 0.20)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#EC5B38";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(236, 91, 56, 0.20)";
            }}
          >
            {loading ? "Please wait..." : otpSent ? "Verify OTP" : "Get OTP"}
          </button>

          {/* Go back */}
          {otpSent && (
            <button
              type="button"
              className="w-full py-3.5 mt-3 rounded-xl text-sm font-semibold tracking-[1px] uppercase transition-all duration-200 hover:-translate-y-0.5"
              style={{
                backgroundColor: "transparent",
                color: "#A8A492",
                border: "1px solid #A8A492",
              }}
              onClick={() => { setOtpSent(false); setOtp(""); setError(""); }}
            >
              Wrong email? Go back
            </button>
          )}
        </form>

        {/* Login link */}
        <p className="mt-7 text-center text-sm" style={{ color: "#A8A492" }}>
          Already have an account?{" "}
          <Link
            to="/"
            className="font-semibold transition-colors duration-150"
            style={{ color: "#EC5B38" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#524646"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#EC5B38"; }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;