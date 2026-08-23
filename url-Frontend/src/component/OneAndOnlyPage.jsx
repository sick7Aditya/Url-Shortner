import React, { useState } from "react";
import { PostMapping } from "./axios.js";
import Navbar from "../More/Navbar.jsx";
import { Link } from "react-router-dom";

function OneAndOnlyPage() {
  const [url, setUrl] = useState("");
  const [displayNewUrl, setDisplay] = useState("");
  const [isError, setIsError] = useState(false);

  async function addUrl(e) {
    e.preventDefault();
    setDisplay("");
    setIsError(false);
    const r = await PostMapping(url);
    if (r.data.startsWith("Limit")) {
      setDisplay("Only 5 URLs can be produced per user.");
      setIsError(true);
    } else if (r.data.startsWith("Wrong")) {
      setDisplay("Wrong credential error. Please login again.");
      setIsError(true);
    } else {
      setDisplay(`${import.meta.env.app}/u` + r.data);
    }
  }

  const inputFocus = {
    onFocus: (e) => {
      e.target.style.borderColor = "#EC5B38";
      e.target.style.boxShadow = "0 0 0 3px rgba(236, 91, 56, 0.12)";
    },
    onBlur: (e) => {
      e.target.style.borderColor = "#A8A492";
      e.target.style.boxShadow = "none";
    },
  };

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen w-full flex items-center justify-center px-4"
        style={{ backgroundColor: "#FCF2E5" }}
      >
        <div
          className="w-full max-w-md rounded-3xl p-8 sm:p-10"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #A8A492",
            boxShadow: "0 18px 45px rgba(82, 70, 70, 0.10)",
          }}
        >
          {/* Notice */}
          <div
            className="rounded-2xl px-4 py-3 mb-7 text-xs text-center"
            style={{
              backgroundColor: "#FCF2E5",
              border: "1px solid #A8A492",
              color: "#A8A492",
            }}
          >
            URLs are deleted after 5 hrs.{" "}
            <Link
              to="/About"
              style={{ color: "#EC5B38", fontWeight: 600 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#524646")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#EC5B38")}
            >
              Learn more
            </Link>
          </div>

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
              Shorten your URL
            </h2>
            <p className="mt-2 text-sm" style={{ color: "#A8A492" }}>
              Welcome back. Paste your long URL below.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={addUrl}>
            <label
              className="block text-xs font-semibold tracking-[1px] uppercase mb-2"
              style={{ color: "#524646" }}
            >
              Long URL
            </label>
            <input
              type="text"
              placeholder="https://your-long-url.com/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 mb-6"
              style={{
                backgroundColor: "#FCF2E5",
                color: "#524646",
                border: "1px solid #A8A492",
              }}
              {...inputFocus}
            />

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
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(82, 70, 70, 0.20)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#EC5B38";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(236, 91, 56, 0.20)";
              }}
            >
              Generate Short URL
            </button>
          </form>

          {/* Result */}
          <div
            className="mt-7 px-4 py-4 rounded-2xl text-sm text-center"
            style={{
              backgroundColor: "#FCF2E5",
              border: `1px solid ${isError ? "#EC5B38" : "#A8A492"}`,
              color: "#524646",
            }}
          >
            <p
              className="text-xs font-semibold tracking-[1px] uppercase mb-2"
              style={{ color: "#A8A492" }}
            >
              Shortened URL
            </p>
            {displayNewUrl ? (
              isError ? (
                <p className="text-xs" style={{ color: "#EC5B38" }}>
                  {displayNewUrl}
                </p>
              ) : (
                <a
                  href={displayNewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold break-all transition-colors duration-150"
                  style={{ color: "#EC5B38" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#524646")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#EC5B38")}
                >
                  {displayNewUrl}
                </a>
              )
            ) : (
              <p className="text-xs" style={{ color: "#A8A492" }}>
                Your short URL will appear here.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default OneAndOnlyPage;