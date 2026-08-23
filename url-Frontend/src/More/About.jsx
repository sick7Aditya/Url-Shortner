import React from 'react'
import Navbar from './Navbar'

function About() {
  return (
    <>
      <Navbar />
      <div
        className="min-h-screen w-full flex items-center justify-center px-4 py-12"
        style={{ backgroundColor: "#FCF2E5" }}
      >
        <div
          className="w-full max-w-xl rounded-3xl p-8 sm:p-10"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #A8A492",
            boxShadow: "0 18px 45px rgba(82, 70, 70, 0.10)",
          }}
        >
          <p
            className="text-xs font-semibold tracking-[3px] uppercase mb-2"
            style={{ color: "#A8A492" }}
          >
            URL Shortener
          </p>

          <h1
            className="text-3xl sm:text-4xl font-semibold leading-tight mb-6"
            style={{ color: "#524646" }}
          >
            Hey, everyone 👋
          </h1>

          <p className="text-sm mb-4" style={{ color: "#524646" }}>
            I'm <span style={{ color: "#EC5B38", fontWeight: 600 }}>Ace</span> — the creator of this.
          </p>

          <p className="text-sm mb-4" style={{ color: "#524646" }}>
            Don't worry about your credentials — since you're already logged in,
            they're already cooked :3
          </p>

          <p className="text-sm mb-4" style={{ color: "#524646" }}>
            But jokes aside — if you're a business or someone who needs a reliable
            URL shortener,{" "}
            <strong style={{ color: "#EC5B38" }}>please don't use this website.</strong>{" "}
            Your shortened URL will only stay valid for about 5 hours, after which
            the database gets refreshed and all stored URLs are deleted.
          </p>

          <p className="text-sm mb-4" style={{ color: "#524646" }}>
            This was a{" "}
            <span style={{ color: "#EC5B38", fontWeight: 600 }}>side project</span>,
            not a service. (I don't have the money to store URLs forever — I need to
            save resources for other projects too, TvT.)
          </p>

          <p className="text-sm mb-6" style={{ color: "#524646" }}>
            Anyway, run along now.
          </p>

          <div
            className="rounded-2xl px-4 py-3 text-xs"
            style={{
              backgroundColor: "#FCF2E5",
              border: "1px solid #A8A492",
              color: "#A8A492",
              fontStyle: "italic",
            }}
          >
            I don't delete your account credentials — but I do delete your URLs.
            Yeah, I'm the bad guy 😘
          </div>
        </div>
      </div>
    </>
  );
}

export default About;