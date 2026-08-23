import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { MyAllUrls } from '../component/axios';

function Profile() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(null);

  async function fetchUrls() {
    try {
      const r = await MyAllUrls();
      setUrls(r.data);
    } catch (err) {
      setError('Failed to fetch URLs.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchUrls(); }, []);

  function copyToClipboard(shortUrl, id) {
    navigator.clipboard.writeText(shortUrl);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen w-full px-4 py-12"
        style={{ backgroundColor: "#FCF2E5" }}
      >
        {/* Header */}
        <div className="max-w-xl mx-auto mb-8">
          <p
            className="text-xs font-semibold tracking-[3px] uppercase mb-2"
            style={{ color: "#A8A492" }}
          >
            URL Shortener
          </p>
          <h1
            className="text-3xl sm:text-4xl font-semibold"
            style={{ color: "#524646" }}
          >
            Your URLs
          </h1>
        </div>

        {/* States */}
        {loading && (
          <p className="text-center text-sm" style={{ color: "#A8A492" }}>Loading...</p>
        )}
        {!loading && error && (
          <p className="text-center text-sm" style={{ color: "#EC5B38" }}>{error}</p>
        )}
        {!loading && !error && urls.length === 0 && (
          <p className="text-center text-sm" style={{ color: "#A8A492" }}>
            You haven't created any URLs yet.
          </p>
        )}

        {/* URL Cards */}
        {!loading && !error && (
          <div className="max-w-xl mx-auto flex flex-col gap-4">
            {urls.map((url) => {
              const shortUrl = `https://url-shortly-ten.vercel.app/u/${url.smallHashCode}`;
              const id = url.id || url._id;
              return (
                <div
                  key={id}
                  className="rounded-2xl p-5"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #A8A492",
                    boxShadow: "0 8px 24px rgba(82, 70, 70, 0.08)",
                  }}
                >
                  {/* Original URL */}
                  <p
                    className="text-xs font-semibold tracking-[1px] uppercase mb-1"
                    style={{ color: "#A8A492" }}
                  >
                    Original
                  </p>
                  <p
                    className="text-sm mb-4 break-all"
                    style={{ color: "#524646" }}
                  >
                    {url.url}
                  </p>

                  {/* Short URL */}
                  <p
                    className="text-xs font-semibold tracking-[1px] uppercase mb-1"
                    style={{ color: "#A8A492" }}
                  >
                    Short
                  </p>
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold break-all transition-colors duration-150"
                    style={{ color: "#EC5B38" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#524646")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#EC5B38")}
                  >
                    {shortUrl}
                  </a>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs" style={{ color: "#A8A492" }}>
                      Expires: {new Date(url.expireAt).toLocaleString()}
                    </span>

                    <button
                      onClick={() => copyToClipboard(shortUrl, id)}
                      className="px-4 py-1.5 rounded-xl text-xs font-semibold tracking-[1px] uppercase transition-all duration-200"
                      style={{
                        backgroundColor: copied === id ? "#524646" : "transparent",
                        color: copied === id ? "#ffffff" : "#EC5B38",
                        border: `1px solid ${copied === id ? "#524646" : "#EC5B38"}`,
                      }}
                    >
                      {copied === id ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
