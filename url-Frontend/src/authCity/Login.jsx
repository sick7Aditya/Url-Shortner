import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const DEMO_EMAIL = "demo@gmail.com";
  const DEMO_PASSWORD = "12345678";

  function handleEmailChange(e) {
    setEmail(e.target.value);
    setError("");
  }

  function handlePwdChange(e) {
    setPwd(e.target.value);
    setError("");
  }

  function useDemoAccount() {
    setEmail(DEMO_EMAIL);
    setPwd(DEMO_PASSWORD);
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // if (email === DEMO_EMAIL && pwd === DEMO_PASSWORD) {
    //   localStorage.setItem("email", email);
    //   navigate("/home");
    //   return;
    // }

    try {
      const r = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/Login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, pwd }),
        }
      );

      const data = await r.text();

      if (
        data ===
        "what the heck mail doesnt exist?Sign Up First with this mail!"
      ) {
        setError("This email doesn't exist. Please sign up first.");
      } else if (data === "gtg") {
        localStorage.setItem("email", email);
        navigate("/home");
      } else {
        setError("Wrong credentials. Please check your password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Unable to connect to the server. Please try again.");
    }
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4"
      style={{
        backgroundColor: "#FCF2E5",
        color: "#524646",
        fontFamily: "inherit",
      }}
    >
      {/* Login Card */}
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
            Welcome back
          </h2>

          <p
            className="mt-2 text-sm"
            style={{ color: "#A8A492" }}
          >
            Sign in to continue shortening your links.
          </p>
        </div>

        {/* Demo Account */}
        <div
          className="flex items-center justify-between gap-4 rounded-2xl px-4 py-4 mb-7"
          style={{
            backgroundColor: "#FCF2E5",
            border: "1px solid #A8A492",
          }}
        >
          <div className="min-w-0">
            <p
              className="text-sm font-semibold"
              style={{ color: "#524646" }}
            >
              Try the demo account
            </p>

            <p
              className="text-xs mt-1"
              style={{ color: "#A8A492" }}
            >
              No sign up needed
            </p>
          </div>

          <button
            type="button"
            onClick={useDemoAccount}
            className="shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
            style={{
              backgroundColor: "#A8A492",
              color: "#ffffff",
            }}
          >
            Use Demo
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-7">
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: "#A8A492" }}
          />

          <span
            className="text-[10px] font-semibold tracking-[1.5px] uppercase"
            style={{ color: "#A8A492" }}
          >
            or sign in
          </span>

          <div
            className="flex-1 h-px"
            style={{ backgroundColor: "#A8A492" }}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <label
            className="block text-xs font-semibold tracking-[1px] uppercase mb-2"
            style={{ color: "#524646" }}
          >
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={handleEmailChange}
            required
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 mb-5"
            style={{
              backgroundColor: "#FCF2E5",
              color: "#524646",
              border: "1px solid #A8A492",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#EC5B38";
              e.target.style.boxShadow =
                "0 0 0 3px rgba(236, 91, 56, 0.12)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#A8A492";
              e.target.style.boxShadow = "none";
            }}
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
            name="pwd"
            placeholder="••••••••"
            value={pwd}
            onChange={handlePwdChange}
            required
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 mb-6"
            style={{
              backgroundColor: "#FCF2E5",
              color: "#524646",
              border: "1px solid #A8A492",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#EC5B38";
              e.target.style.boxShadow =
                "0 0 0 3px rgba(236, 91, 56, 0.12)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#A8A492";
              e.target.style.boxShadow = "none";
            }}
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl text-sm font-semibold tracking-[1px] uppercase transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            style={{
              backgroundColor: "#EC5B38",
              color: "#ffffff",
              boxShadow: "0 8px 20px rgba(236, 91, 56, 0.20)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#524646";
              e.currentTarget.style.boxShadow =
                "0 8px 20px rgba(82, 70, 70, 0.20)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#EC5B38";
              e.currentTarget.style.boxShadow =
                "0 8px 20px rgba(236, 91, 56, 0.20)";
            }}
          >
            Sign In
          </button>

          {/* Error */}
          {error && (
            <p
              className="mt-4 px-4 py-3 rounded-xl text-xs leading-relaxed"
              style={{
                color: "#524646",
                backgroundColor: "#FCF2E5",
                border: "1px solid #EC5B38",
              }}
            >
              {error}
            </p>
          )}
        </form>

        {/* Signup */}
        <p
          className="mt-7 text-center text-sm"
          style={{ color: "#A8A492" }}
        >
          No account?{" "}
          <Link
            to="/signup"
            className="font-semibold transition-colors duration-150"
            style={{ color: "#EC5B38" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#524646";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#EC5B38";
            }}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;