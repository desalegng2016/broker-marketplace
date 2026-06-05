import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
 
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(null);
  const navigate = useNavigate();
 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (error) {
      console.log(error);
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');
 
        * { box-sizing: border-box; margin: 0; padding: 0; }
 
        .login-root {
          min-height: 100vh;
          display: flex;
          align-items: stretch;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          background: #0a0a0f;
          overflow: hidden;
          position: relative;
        }
 
        .layout-inner {
          display: flex;
          width: 100%;
          max-width: 1100px;
          min-height: 100vh;
        }
 
        /* Animated background blobs */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.18;
          animation: float 12s ease-in-out infinite;
        }
        .blob-1 {
          width: 520px; height: 520px;
          background: radial-gradient(circle, #c9a96e, #8b5e2e);
          top: -120px; left: -120px;
          animation-delay: 0s;
        }
        .blob-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, #e8d5a3, #c9a96e);
          bottom: -80px; right: -80px;
          animation-delay: -6s;
        }
        .blob-3 {
          width: 280px; height: 280px;
          background: radial-gradient(circle, #a07840, #5c3d1a);
          top: 50%; left: 55%;
          animation-delay: -3s;
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -40px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.97); }
        }
 
        /* Subtle grid overlay */
        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(201,169,110,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,110,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }
 
        /* Left panel */
        .left-panel {
          display: none;
          flex: 1;
          flex-direction: column;
          justify-content: center;
          padding: 64px;
          position: relative;
          z-index: 1;
        }
        @media (min-width: 900px) {
          .left-panel { display: flex; }
        }
 
        .brand-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(201,169,110,0.12);
          border: 1px solid rgba(201,169,110,0.25);
          border-radius: 100px;
          padding: 6px 16px 6px 6px;
          margin-bottom: 48px;
          width: fit-content;
        }
        .brand-dot {
          width: 28px; height: 28px;
          background: linear-gradient(135deg, #c9a96e, #8b5e2e);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; color: #0a0a0f;
        }
        .brand-text {
          font-size: 13px;
          color: #c9a96e;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
 
        .left-headline {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(36px, 4vw, 54px);
          font-weight: 700;
          color: #f5efe6;
          line-height: 1.18;
          margin-bottom: 24px;
        }
        .left-headline .accent {
          color: #c9a96e;
          font-style: italic;
        }
 
        .left-desc {
          font-size: 15px;
          color: rgba(245,239,230,0.45);
          line-height: 1.7;
          max-width: 380px;
          margin-bottom: 48px;
        }
 
        .stats-row {
          display: flex;
          gap: 40px;
        }
        .stat-item { }
        .stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #c9a96e;
        }
        .stat-label {
          font-size: 12px;
          color: rgba(245,239,230,0.35);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-top: 2px;
        }
 
        /* Right panel / form */
        .right-panel {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          position: relative;
          z-index: 1;
        }
        @media (min-width: 900px) {
          .right-panel {
            flex: 1;
            border-left: 1px solid rgba(201,169,110,0.1);
          }
        }
 
        .card {
          width: 100%;
          max-width: 400px;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(201,169,110,0.15);
          border-radius: 24px;
          padding: 44px 40px;
          backdrop-filter: blur(20px);
          box-shadow: 0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,169,110,0.1);
        }
 
        .card-header {
          margin-bottom: 36px;
        }
        .card-eyebrow {
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #c9a96e;
          font-weight: 500;
          margin-bottom: 10px;
        }
        .card-title {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #f5efe6;
          line-height: 1.2;
          margin-bottom: 8px;
        }
        .card-sub {
          font-size: 14px;
          color: rgba(245,239,230,0.4);
        }
 
        /* Divider */
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,169,110,0.25), transparent);
          margin-bottom: 32px;
        }
 
        /* Field */
        .field {
          margin-bottom: 20px;
        }
        .field-label {
          display: block;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(245,239,230,0.5);
          margin-bottom: 8px;
        }
        .field-wrap {
          position: relative;
        }
        .field-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(201,169,110,0.5);
          font-size: 16px;
          pointer-events: none;
          transition: color 0.2s;
        }
        .field-wrap.is-focused .field-icon {
          color: #c9a96e;
        }
        .field-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(201,169,110,0.15);
          border-radius: 12px;
          padding: 14px 14px 14px 42px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #f5efe6;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .field-input::placeholder {
          color: rgba(245,239,230,0.2);
        }
        .field-input:focus {
          border-color: rgba(201,169,110,0.5);
          background: rgba(201,169,110,0.05);
          box-shadow: 0 0 0 3px rgba(201,169,110,0.08);
        }
        .toggle-pw {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(201,169,110,0.4);
          font-size: 15px;
          padding: 4px;
          transition: color 0.2s;
        }
        .toggle-pw:hover { color: #c9a96e; }
 
        /* Submit button */
        .btn-submit {
          width: 100%;
          margin-top: 8px;
          padding: 15px;
          background: linear-gradient(135deg, #c9a96e 0%, #8b5e2e 100%);
          border: none;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #0a0a0f;
          letter-spacing: 0.03em;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 8px 24px rgba(201,169,110,0.25);
        }
        .btn-submit:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
          box-shadow: 0 12px 32px rgba(201,169,110,0.35);
        }
        .btn-submit:active:not(:disabled) {
          transform: translateY(0);
        }
        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .btn-submit::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
          pointer-events: none;
        }
 
        .spinner {
          display: inline-block;
          width: 16px; height: 16px;
          border: 2px solid rgba(10,10,15,0.3);
          border-top-color: #0a0a0f;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          vertical-align: middle;
          margin-right: 8px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
 
        .card-footer {
          text-align: center;
          margin-top: 28px;
          font-size: 12px;
          color: rgba(245,239,230,0.2);
          letter-spacing: 0.03em;
        }
 
        /* Fade-in animation */
        .card {
          animation: fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .left-panel > * {
          animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both;
        }
        .left-panel > *:nth-child(2) { animation-delay: 0.1s; }
        .left-panel > *:nth-child(3) { animation-delay: 0.2s; }
        .left-panel > *:nth-child(4) { animation-delay: 0.3s; }
      `}</style>
 
      <div className="login-root">
        {/* Background effects */}
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="grid-overlay" />
 
        <div className="layout-inner">
        {/* Left panel */}
        <div className="left-panel">
          <div className="brand-badge">
            <div className="brand-dot">A</div>
            <span className="brand-text">Admin Portal</span>
          </div>
 
          <h1 className="left-headline">
            Manage your<br />
            <span className="accent">properties</span><br />
            with ease.
          </h1>
 
          <p className="left-desc">
            A powerful dashboard built for property managers.
            Track listings, tenants, and revenue from one place.
          </p>
 
          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-num">240+</div>
              <div className="stat-label">Properties</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">98%</div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">12K</div>
              <div className="stat-label">Tenants</div>
            </div>
          </div>
        </div>
 
        {/* Right panel — form */}
        <div className="right-panel">
          <div className="card">
            <div className="card-header">
              <div className="card-eyebrow">Secure Access</div>
              <div className="card-title">Welcome back</div>
              <div className="card-sub">Sign in to your admin account</div>
            </div>
 
            <div className="divider" />
 
            <form onSubmit={handleLogin}>
              {/* Email */}
              <div className="field">
                <label className="field-label">Email address</label>
                <div className={`field-wrap ${focused === "email" ? "is-focused" : ""}`}>
                  <span className="field-icon">✉</span>
                  <input
                    className="field-input"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    required
                  />
                </div>
              </div>
 
              {/* Password */}
              <div className="field">
                <label className="field-label">Password</label>
                <div className={`field-wrap ${focused === "password" ? "is-focused" : ""}`}>
                  <span className="field-icon">🔒</span>
                  <input
                    className="field-input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused(null)}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-pw"
                    onClick={() => setShowPassword((v) => !v)}
                    tabIndex={-1}
                  >
                    {showPassword ? "🙈" : "👁"}
                  </button>
                </div>
              </div>
 
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading && <span className="spinner" />}
                {loading ? "Signing in…" : "Sign In"}
              </button>
            </form>
 
            <div className="card-footer">
              © {new Date().getFullYear()} Property Admin Panel · All rights reserved
            </div>
          </div>
        </div>
        </div>{/* end layout-inner */}
      </div>
    </>
  );
}
 